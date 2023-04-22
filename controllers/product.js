const ProductService = require('../Services/product');
const productServiceInstance = new ProductService();
const getAllProducts = async (req,res)=>{
    try{
        let [products,productsCount] = await productServiceInstance.getAllProducts(req.query);
        if(products){
            res.status(200).json({
                message:"Products Fetched Successfully",
                data:products,
                count:productsCount,
                fetchedCount:products.length 
            })
        }
        else{
            res.status(404).json({
                message:"Product not found"
            })
        }
    }catch(err){
        console.log(err);
        res.status(500).json({
            message:"Server Error "
        })
    }
   
    
}
const addProduct = async (req,res)=>{
    try{
        let product = await productServiceInstance.addProduct(req.body);
        if(product){
            res.status(200).json({
                message:"Product created  Successfully",
                data:product
            })
        }
        else{
            res.status(404).json({
                message:"Could not Add product"
            })
        }
    }catch(err){
        console.log(err);
        res.status(500).json({
            message:"Server Error please enter product details correctly"
        })
    }
   
    
}
const updateProduct = async (req,res)=>{
    try{
        let queryObject = {
            productId:req.params.productId,
            query:req.body
        }
        let product = await productServiceInstance.updateProduct(queryObject);
        if(product){
            res.status(200).json({
                message:"Product Updated Successfully",
                data:product
            })
        }
        else{
            res.status(404).json({
                message:"requested product for updation does not exist"
            })
        }
    }catch(err){
        res.status(500).json({
            message:"Server Error could not update product "
        })
    }
   
    
}
const deleteProduct = async (req,res)=>{
    try{
        
        let product = await productServiceInstance.deleteProduct(req.params);
        if(product){
            res.status(200).json({
                message:"Product Deleted Successfully",
                data:product
            })
        }
        else{
            res.status(404).json({
                message:"requested product for deletion does not exist"
            })
        }
    }catch(err){
        res.status(500).json({
            message:"Server Error could not delete product "
        })
    }
   
    
}
module.exports = {addProduct,getAllProducts,updateProduct,deleteProduct};