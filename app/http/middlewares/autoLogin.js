const { verifyJwtToken } = require("../../modules/functions");
const {UserModel} = require("../../models/user")
const checkLogin = async (req,res,next)=>{
    try{
        let authError = {status: 401 , message: "Please Login on Your Account"}
        const authorization = req?.headers?.authorization;
        if(!authorization) throw authError
        let token = authorization.split(" ")?.[1];
        if(!token) throw authError
        const result = verifyJwtToken(token);
        const {username} = result
        console.log(result)
        const user = await UserModel.findOne({username},{password: 0})
        if(!user) throw authError
        req.user = user;
        return next()
    }catch(error){
        next(error)
    }
}
module.exports = {
    checkLogin
}