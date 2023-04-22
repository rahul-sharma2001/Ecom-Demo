const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Product Name must be required"]
    },
    description:{
        type:String,
        required:[true,"Product Description must be required"]
    },
    price:{
        type:Number,
        required:[true,"Price Must be required"]
    },
    images:{
        type:[String],
        required:[true,"Images must be required"]
    },
    status:{
        type:String,
        required:[true,"Status Must be required"]
    }
})

const productModel = mongoose.model('product',productSchema);

module.exports = productModel