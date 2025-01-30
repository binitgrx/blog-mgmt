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
const { use, search } = require("./user.route");

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
  console.log(currentUser, body);

  const user = await userModel.findById(currentUser);

  if (!user) throw new Error("user not found");

  const isValidPw = comparePassword(body?.oldPassword, user.password);
  if (!isValidPw) throw new Error("password mismatched");

  const newHashedPw = hashPassword(body?.newPassword);

  const res = await userModel.findByIdAndUpdate(
    { _id: currentUser },
    { password: newHashedPw }
  );
  if (!res) throw new Error("something went wrong");
  return true;
};

const blockUser = async (id) => {
  const user = await userModel.findOne({ _id: id });
  if (!user) throw new Error("user not found");
  const currentStatus = user.isActive;
  console.log(user);
  const updatedUser = await userModel.updateOne(
    { _id: user?.id },
    { isActive: !currentStatus }
  );
  if (!updatedUser.acknowledged) throw new Error("something went wrong");
  return true;
};

const getById = async (id) => {
  return await userModel.findById({ _id: id }).select("-password");
};
const getProfile = async (currentUser) => {
  return await userModel.findOne({ _id: currentUser });
};

const list = async (search,page=1,limit=10) => {
  const query = [];
  if (search?.name) {
    query.push({
      $match: {
        name: new RegExp(search?.name, "gi"),
      },
    });
  }
  if(search?.roles){
    query.push({
      '$match': {
        'roles': search?.roles
      }
    })
  }
  query.push({
    '$facet': {
      'metadata': [
        {
          '$count': 'total'
        }
      ], 
      'data': [
        {
          '$skip': (+page - 1) * +limit
        }, {
          '$limit': +limit
        }
      ]
    }
  }, {
    '$addFields': {
      'total': {
        '$arrayElemAt': [
          '$metadata.total', 0
        ]
      }
    }
  }, {
    '$project': {
      'data.password': 0
    }
  })
  const result= await userModel.aggregate(query);
  return{
    total:result[0]?.total || 0,
    totalPages :Math.ceil(result[0]?.data.length/limit),
    data:result[0]?.data,
    page:+page,
    limit : +limit
  }
};

const updateRole = async (id, payload) => {
  const user = await userModel.findOne({ _id: id });
  if (!user) throw new Error("user not found");
  const { roles } = payload;
  const newRoles = [...roles];
  if (newRoles.length == 0) throw new Error("roles cant be empty");
  await userModel.updateOne({ _id: user?.id }, { roles: newRoles });
};

module.exports = {
  updateRole,
  register,
  login,
  getById,
  getProfile,
  list,
  verifyEmail,
  generateFPToken,
  verifyFPToken,
  changePassword,
  blockUser,
};
