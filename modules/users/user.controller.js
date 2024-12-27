const userModel = require("./user.model");
const {
  hashpassword,
  hashPassword,
  comparePassword,
} = require("../../utils/bcrypt");
const { sendMail } = require("../../services/mailer");
const { compare } = require("bcryptjs");
const { generateRandomToken } = require("../../utils/token");
const { token } = require("morgan");

const register = async (payload) => {
  const { role, password, ...rest } = payload;
  rest.password = hashPassword(password);
  rest.token = generateRandomToken();
  const user = userModel.create(rest);
  if (user) {
    await sendMail({
      to: rest.email,
      subject: "Welcome to Express app",
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
  return "logged in";
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
  if(!updateUser) throw new Error("cannot proceed. try again");
  return "Email verification completed"
};

module.exports = { register, login, verifyEmail };
