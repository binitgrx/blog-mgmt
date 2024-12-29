const userModel = require("./user.model");
const {
  hashpassword,
  hashPassword,
  comparePassword,
} = require("../../utils/bcrypt");
const { sendMail } = require("../../services/mailer");
const { compare } = require("bcryptjs");
const {
  generateRandomToken,
  generateJWT,
  verifyJWT,
} = require("../../utils/token");
const { token } = require("morgan");
const { string } = require("joi");
const { use } = require("./user.route");

const register = async (payload) => {
  const { role, password, ...rest } = payload;
  rest.password = hashPassword(password);
  rest.token = generateRandomToken();
  const user = userModel.create(rest);
  if (user) {
    await sendMail({
      to: rest.email,
      subject: "Welcome to BlogQuill",
      message: `Dear ${rest.name}<br/><p> Thank you for signing up!</p>
      <p>Your OTP for email verification is ${rest.token} `,
    });
  }
};
const login = async (payload) => {
  const { email, password } = payload;
  const user = await userModel.findOne({
    email,
    isActive: true,
    isEmailVerified: true,
  });
  if (!user || !user.isEmailVerified || !user.isActive) {
    throw new Error(
      !user
        ? "User does not exist"
        : !user.isEmailVerified
        ? "Email is not verified"
        : "User is not active"
    );
  }
  const PWmatch = comparePassword(password, user?.password);
  if (!PWmatch) throw new Error("email or password missmatched");
  //token generation
  const accessToken = generateJWT(payload);

  const { name, email: userEmail } = user;
  const userInfo = { name, email: userEmail, accessToken };
  return userInfo;
};
const verifyEmail = async (payload) => {
  const { email, token } = payload;
  const user = await userModel.findOne({ email, isActive: true });
  if (!user) throw new Error("user not found");
  const isValidToken = token == user?.token;
  if (!isValidToken) throw new Error("token mismatched");
  const updateUser = await userModel.updateOne(
    { email },
    { token: "", isEmailVerified: true }
  );
  if (!updateUser) throw new Error("cannot proceed. try again");
  return "Email verification completed";
};

const generateFPToken = async (email) => {
  const user = await userModel.findOne({
    email,
    isActive: true,
    isEmailVerified: true,
  });
  if (!user) throw new Error("user not found");

  const newFPToken = generateRandomToken();

  const updatedUser = await userModel.updateOne(
    { email },
    { token: newFPToken }
  );
  if (!updatedUser.acknowledged) throw new Error("something went wrong");
  await sendMail({
    to: email,
    subject: "FORGET PASSWORD | BlogQuill",
    message: `Dear ${user?.name}<br/>
      <p>Your OTP for password reset is <strong>${newFPToken}</strong></p> `,
  });
};

const verifyFPToken = async (payload) => {
  const { email, token, password: newPassword } = payload;
  const user = await userModel.findOne({
    email,
    isActive: true,
    isEmailVerified: true,
  });
  if (!user) throw new Error("user not found");
  if (!user.token) throw new Error("token is missing");

  const isValidToken = user?.token == String(token);
  if (!isValidToken) throw new Error("email or token is mismatched");

  const hashPw = hashPassword(newPassword);
  const updatedUser = await userModel.updateOne(
    { email },
    { password: newPassword, token: "" }
  );
  if (!updatedUser.acknowledged) throw new Error("something went wrong");
  return true;
};

const changePassword = async (request) => {
  const { currentUser, body } = request;
  console.log(currentUser,body);

  const user = await userModel.findById(
    currentUser);

  if (!user) throw new Error("user not found");

  const isValidPw = comparePassword(body?.oldPassword, user.password);
  if (!isValidPw) throw new Error("password mismatched");

  const newHashedPw = hashPassword(body?.newPassword);

  const res = await userModel.findByIdAndUpdate(
    { _id: currentUser },
    { password: newHashedPw }
  );
  if(!res) throw new Error ("something went wrong");
  return true;
};

module.exports = {
  register,
  login,
  verifyEmail,
  generateFPToken,
  verifyFPToken,
  changePassword,
};
