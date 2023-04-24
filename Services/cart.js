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
            throw err
        }
    }
    addProductToCart= async(cartData)=>{
        try{
            let {userId,product}=cartData;
            
            if(!userId){
                throw new Error("Must provide User Id");
            }
            let cart = await cartModel.findOne({'userId':userId});
            cart.products.push(product);
            let updatedCart = await cartModel.findOneAndUpdate(
                {'userId':userId}
            ,
            {$set:{products:cart.products}},
            {new:true});

            return updatedCart;
        }
        catch(err){
            throw new Error(err);
        }
    }
    getCart = async (userId)=>{
        try{
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
}
module.exports= CartService;