const productModel = require('../model/product');
class ProductService {
    addProduct = async (productdetails) => {
        try {
            let newProduct = await new productModel(productdetails);
            let product = await newProduct.save();
            return product;
        }
        catch (err) {
            throw err
        }

    }
    getAllProducts = async (queryObject) => {
        try {
            let { limit = 10, offset = 0, search, status } = queryObject;
            if (!search) {
                if (!status) {
                    let count = await productModel.collection.countDocuments();
                    let products = await productModel.find().skip(offset).limit(limit);
                    return [products, count]
                }
                else {
                    let count = await productModel.find({ 'status': status }).countDocuments();
                    let products = await productModel.find({ 'status': status }).skip(offset).limit(limit);
                    return [products, count]
                }
            }
            else {
                if (!status) {
                    let count = await productModel.find({ $or: [{ 'name': { $regex: search, $options: 'i' } }, { 'description': { $regex: search, $options: "i" } }] }).countDocuments();
                    let products = await productModel.find({ $or: [{ 'name': { $regex: search, $options: 'i' } }, { 'description': { $regex: search, $options: "i" } }] }).skip(offset).limit(limit)
                    return [products, count];
                }
                else {
                    let count = await productModel.find({ $and: [{ 'status': status }, { $or: [{ 'name': { $regex: search, $options: 'i' } }, { 'description': { $regex: search, $options: "i" } }] }] }).countDocuments();
                    let products = await productModel.find({ $and: [{ 'status': status }, { $or: [{ 'name': { $regex: search, $options: 'i' } }, { 'description': { $regex: search, $options: "i" } }] }] }).skip(offset).limit(limit)
                    return [products, count];

                }

            }

        }
        catch (err) {
            throw err
        }

    }
    updateProduct = async (queryObject) => {
        const { productId, query } = queryObject;
        try {
            let updatedProduct = await productModel.findOneAndUpdate({
                _id: productId
            }, {
                $set: query
            }, { new: true });
            return updatedProduct;
        }
        catch (err) {
            throw err
        }
    }
    deleteProduct = async ({ productId }) => {
        try {
            let deletedProduct = await productModel.findOneAndDelete({
                _id: productId
            });
            return deletedProduct;
        }
        catch (err) {
            throw err
        }
    }
    imageUpload = async (files) => {
        try {
            const urls = [];
            files.forEach(element => {
                const arr = `${process.env.SERVER_URL}/${element.path.split('/').slice(1).join('/')}`;
                urls.push(arr);
            });
            res.json({ urls: urls });
        }
        catch (err) {
            throw err
        }
    }
    sortProducts= async(sortparams)=>{
        try{
            let {sort,limit=10,offset=0,order='asc'}= sortparams
            let orderNumber=1;
            order=='asc'?orderNumber=1:orderNumber=-1;
            const count  = await productModel.find({}).sort({[sort]:orderNumber}).countDocuments();
            const sortedProducts = await productModel.find({}).sort({[sort]:orderNumber}).skip(offset).limit(limit);
            return [sortedProducts,count];
        }
        catch(err){
            console.log(err);
            throw err;
        }
    }
}
module.exports = ProductService;