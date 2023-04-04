const {body} = require("express-validator")
const { UserModel } = require("../../models/user")
function registerValidator(){
    return [
        body("username").custom(async (value ,ctx)=>{
            if(value){
                const usernameRegex = /^[a-z]+[a-z0-9\_\.]{2,}/gi
                if(usernameRegex.test(value)){
                    const user = await UserModel.findOne({username : value})
                    if(user) throw "username is exist in System"
                    return true
                }
                throw "Username is not valid"
            }else{
                throw "Username can not be empty"
            }
            
        }),
        body("email").isEmail().withMessage("Email is not valid")
        .custom(async email => {
            const user = await UserModel.findOne({email})
            if(user) throw "email is exist in System";
            return true
        }),
        body("mobile").isMobilePhone("fa-IR").withMessage("Mobile Phone is not valid")
        .custom(async mobile => {
            const user = await UserModel.findOne({mobile})
            if(user) throw "mobile number is exist in System";
            return true
        }),
        body("password").isLength({min:6,max:16}).withMessage("Minimum Password must be 6 And Maximum Password must be 16")
        .custom((value,ctx)=>{
            if(!value) throw "Password can not be Empty";
            if(value !== ctx?.req?.body?.confirm_password) throw "Password and confirm Password is Not Same";
            return true;
        })
    ]
}
function loginValidation(){
    return [
        body("username").notEmpty().withMessage("username can not be empty").custom(username =>{
        const usernameRegex = /^[a-z]+[a-z0-9\_\.]{2,}/gi
        if(usernameRegex.test(username)){
            return true
        }
        throw "Username is not valid"
        }),
        body("password").isLength({min: 6 , max: 16}).withMessage("password is must be between 6 and 16 characters")
    ]
}
module.exports = {
    registerValidator,
    loginValidation
}