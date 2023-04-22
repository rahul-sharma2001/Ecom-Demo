const CartService = require('../Services/cart');
const cartServiceInstance = new CartService();

const createCart = async (req, res) => {
    try {
        const createdCart = await cartServiceInstance.createCart(req.body);
        if (createdCart) {
            res.status(200).json({
                mesage: "Created a cart successfully",
                data: createdCart
            })
        }

    }
    catch(err){
        res.status(500).json({
            message:"Server Error cannot create  a cart"
        })
    }
    
}
const addProductToCart = async(req,res)=>{
    try{
        const userId = req.params.userId;
        const cartData = {
            userId,
            product: req.body

        }
        const newProduct = await cartServiceInstance.addProductToCart(cartData);
        if(newProduct){
            res.status(200).json({
                message:"Product successfully added to cart",
                data: newProduct
            })
        } 
        else{
            res.status(404).json({
                message:"User does not exist"
            })
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message:"Server Error cannot add product to cart"
        })
    }
}
const getCart = async (req,res)=>{
    try{
        let cart = await cartServiceInstance.getCart(req.params.userId);
        if(cart){
            res.status(200).json({
                message:"Cart Data fetched successfully",
                data:cart
            })
        }
        else{
            res.status(404).json({
                message:"User Does not exist"
            })
        }
    }
    catch(err){
        res.status(500).json({
            message:"Server Error cannot get cart"
        })
    }
}
// const deleteCart = async (req, res) => {
//     try{
//         const userId = req.params.userId;
//         const productId = req.query.productId;
//         const queryData = {
//             userId,
//             productId
//         }
//         const deletedProduct = await cartServiceInstance.addProductToCart(queryData);
//         if(deletedProduct){
//             res.status(200).json({
//                 message:"Product successfully deleted from the cart",
//                 data: deletedProduct
//             })
//         } 
//         else{
//             res.status(404).json({
//                 message:"either product does not exist or user does not exist"
//             })
//         }
//     }
//     catch(err){
//         console.log(err);
//         res.status(500).json({
//             message:"Server Error cannot add delete product to cart"
//         })
//     }
    
// }

module.exports = { createCart,addProductToCart,getCart }