const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
function hashString(str){
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(str,salt)
}
function tokenGenerator(payload){
    const token = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: "3 days"})
    return token
}
function verifyJwtToken(token){
    const result = jwt.verify(token,process.env.SECRET_KEY);
    if(!result?.username) throw {status : 401 , message : "Please Login on Your Account"}
    return result
}
module.exports = {
    hashString,
    tokenGenerator,
    verifyJwtToken
}