const { Router } = require('express');
const authController = require('../controllers/productcon');
const upload = require("../middlewares/upload");


const router = Router();

router.post('/addproduct', (upload.single('image')),authController.products);
router.post('/addcategory',authController.category);
router.get('/viewproduct', authController.show_products)
router.get('/viewcategory', authController.show_category)
router.get('/detail/:id', authController.details);
router.delete('/productdel/:id', authController.p_delete);
router.post('/updateproduct/:id', (upload.single('image')), authController.updata); 
router.get('/updata/:id', authController.get_updata);

 
router.post('/add-to-cart/:id', authController.addToCart);
router.get('/cart', authController.getCart);
router.post('/delete-cart/:id', authController.deleteInCart);

router.get('/clearcart', authController.clear);
router.post('/order', authController.placeorder);

router.get('/showorder',authController.show_order);
router.get('/showdetail/:id',authController.show_detail);

module.exports = router;