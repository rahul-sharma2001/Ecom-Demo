const express = require('express');
const router = express.Router();
const controllers = require('../controllers/product')
const multer =  require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const verifyToken = require('../middleware/user');

router.post('/',verifyToken,controllers.addProduct);
router.get('/',verifyToken,controllers.getAllProducts);
router.put('/:productId',verifyToken,controllers.updateProduct);
router.delete('/:productId',verifyToken,controllers.deleteProduct);
router.get('/sort',verifyToken,controllers.sortProducts);



const storage = multer.diskStorage({
    destination: (req , file , cb)=>{
        cb(null,'public/assests/images');
    },
    filename:(req,file,cb)=>{
        cb(null ,uuidv4()+ path.extname(file.originalname));
    }
  })

const upload = multer({storage: storage})
router.post('/imageUpload',upload.array('images',5),controllers.imageUpload);



module.exports = router