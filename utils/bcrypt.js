const bcrypt = require("bcryptjs")

const hashPassword = (text) =>{
    return bcrypt.hashSync(text,Number(process.env.SALT_ROUND))
}

const comparePassword = (text,hashText) => {
    return bcrypt.compareSync(text,hashText)
}

module.exports ={hashPassword,comparePassword}