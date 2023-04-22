const mongoose = require('mongoose')
let {isEmail, isStrongPassword}= require('validator');
const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"Must Provide name"],
        trim:true,
        maxlength:[30,"Name should not be more than 30 characters"]
    },
    email:{
        type:String,
        required:[true,"Must Provide name"],
        unique:true,
        validate: [isEmail,"Please Provide valid email"],
        trim:true
    },
    password:{
        type:String,
        required:[true,"Must Provide Password"],
        validate: [isStrongPassword,"Please Provide Strong Password"],
    },
    contactNo:{
        type:String,
        required:[true,"Must provide contact no"],
        length:[10,"Contact number must be 10 digits"]
    },
    role: {
        type: String,
        trim: true,
        enum: ['user', 'admin', 'seller'],
        required: [true, 'must provide role']
    },
})
module.exports = mongoose.model('user',userSchema);