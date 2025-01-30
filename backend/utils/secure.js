const {verifyJWT} = require("./token");
const userModel = require("../modules/users/user.model");

const secureAPI = (sysRole = []) => {
  return async (req, res, next) => {
    try {
      const { access_token = null } = req.headers;
      if (!access_token) throw new Error("token is missing");
      const { data, exp } = verifyJWT(access_token);
      const currentTime = Math.ceil(Date.now() / 1000);
      if (currentTime > exp) throw new Error("Token is expired");
      const { email } = data;
      const user = await userModel.findOne({
        email,
        isActive: true,
        isEmailVerified: true,
      });
      if (!user) throw new Error("user not found");
      if (sysRole.length == 0) {
        req.currentUser = user?._id
        next();
      } else {
        const isValidRole = sysRole.some((role) => user?.roles.includes(role));
        if (!isValidRole) throw new Error("user unathorized");
        req.currentUser = user?._id
       next();
      }
    } catch (e) {
      next(e);
    }
  };
};

module.exports ={secureAPI};
