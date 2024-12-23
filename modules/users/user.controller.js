const userModel = require("./user.model");
const {hashpassword, hashPassword} =require("../../utils/bcrypt")
const {sendMail} = require("../../services/mailer")

const register = async(payload) => {
    const {role,password,...rest} = payload;
    rest.password = hashPassword(password);
    const user = userModel.create(rest);
    if(user){
        await sendMail({
            to:rest.email,
            subject:"Welcome to Express app",
            message :`Dear ${rest.name}<br/><p> Thank you for signing up!</p>`,
        })
    }
}
module.exports = { register };
