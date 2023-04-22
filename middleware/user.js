const jwt = require('jsonwebtoken');

function verifyToken(req,res,next){
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader!=='undefined'){
        const token = bearerHeader.split(" ")[1];
        const decodedUser = jwt.verify(token,process.env.SECRET_KEY)
        req.body = decodedUser
        next();
    }
    else{
        res.send({
            message:"Token is either invalid or not send"
        })
    }


}
module.exports =  verifyToken