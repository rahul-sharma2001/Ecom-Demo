const UserService = require('../Services/user');
const userServiceInstance = new UserService();
const jwt = require('jsonwebtoken');

const addUser = async(req,res)=>{

    try{
    let newUser = await userServiceInstance.addUser(req.body);
    if(newUser){
        res.status(200).json({
            message:"User Created Successfully",
            data:newUser
        })
    }
    else{
        res.status(404).json({
            message:"could not add user"
        })
    }

    }
    catch(err){
        res.status(500).json({
            message:"Server Error"
        })
    }
    
}
const login = async(req,res)=>{
    try{
    const user = await userServiceInstance.login(req.body);
    console.log(user);
    if(user.status===false){
        res.status(401).json(user);
    }
    else{
        res.status(200).json(user);
    }

    }
    catch(err){
        res.status(500).json({
            message:"Server Error"
        })
    }
    

}

module.exports= {
    addUser,login
}