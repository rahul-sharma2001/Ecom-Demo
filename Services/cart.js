const mongoose = require('mongoose');
const cartModel = require('../model/cart');
class CartService{
    createCart=async (cartData)=>{
        try{
        const cart = await new cartModel(cartData);
        const addedCart =await cart.save();
        if(addedCart){
            return addedCart
        }

        }catch(err){
            console.log(err);
        }
    }
    addProductToCart= async(cartData)=>{
        try{
            let {userId,product}=cartData;
            console.log(userId)
            if(!userId){
                throw new Error("Must provide User Id");
            }
            console.log(userId);

            let cart = await cartModel.findOne({'userId':userId});
            console.log(cart);
            cart.products.push(product);
            console.log(cart);
            let updatedCart = await cartModel.findOneAndUpdate(
                {'userId':userId}
            ,
            {$set:{products:cart.products}},
            {new:true});
            console.log(updatedCart);
            return updatedCart;
        }
        catch(err){
            throw new Error(err);
        }
    }
    getCart = async (userId)=>{
        try{
            console.log(userId)
            if(!userId){
                throw new Error("userId must be required")
            }
            let cartData = await cartModel.findOne({'userId':userId});
            if(cartData){
                return cartData
            }
            
        }
        catch(err){
            throw new Error(err);
        }
    }
    // deleteFromCart= async (queryData)=>{
    //     try{
    //         let {userId,productId}= queryData
    //         let cart = await cartModel.findOne({'userId':userId});
    //         cart.products.remove()

    //         console.log(deletedProduct);
    //         return deletedProduct

    //     }catch(err){
    //         throw new Error(err);
    //     }

    // }
}
module.exports= CartService;