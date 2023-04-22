const userModel = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
class UserService{
    addUser = async (userData)=>{
        try{
            let {password} = userData
            let encryptedPassword=await bcrypt.hash(password,5)
            userData = {...userData,password:encryptedPassword}
            const newUser = await new userModel(userData);
            const savedUser = await newUser.save();
            return savedUser;
        }
        catch(err){
            throw err;
        }
      
    }
    login =  async (loginData)=>{
        try{
            if(!loginData){
                return{
                    status:false,
                    message:"Login data must be required"

                } 
            }
            let {email,password}= loginData
            console.log(email,password);
            let userData = await userModel.findOne({'email':email});
            if(!userData){
                return{
                    status:false,
                    message: "User Does not exist"
                }
            }
            else{
                console.log(userData);
                let encryptedPassword = userData.password
                console.log(encryptedPassword);
                let check =await bcrypt.compare(password,encryptedPassword);
                if(check){
                    const token = jwt.sign({userData},process.env.SECRET_KEY,{expiresIn:7200})
                    userData.token = token;
                    console.log(userData.token)
                    console.log(token,userData)
                    return {
                        status:true,
                        userData:userData,
                        token,
                        message:"login successful"
                    }
                }
                else{
                    return {
                        status:false,
                        message:"incorrect password"
                    };
                }
            }
        }
        catch(err){
            console.log(err)
        }
       
       
    }
    
}
module.exports = UserService;