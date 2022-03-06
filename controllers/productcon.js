const User = require("../models/products");
const orders = require("../models/orders");
const orderdetails = require("../models/orderdetails");
const Categories = require("../models/categories");
const Cart = require('../models/cart');
const orderdetail = require("../models/orderdetails");

// module.exports.signup_get = (req, res) => {
//     res.render('signup');
//   }
  
//   module.exports.login_get = (req, res) => {
//     res.render('login');
//   }
  
  module.exports.products = async (req, res) => {
    const { name , price , number , description , categorie} = req.body;
    const image = req.file.filename;

    const categories = await Categories.findOne({category:categorie});
    console.log(categories);
    try {
      
      const user = await User.create({  name , price , number , description , categories , image}); 
       console.log(user);
       res.redirect('/');
      res.status(201).json({ user: user._id });
      
    }
    catch(err) {
     
      res.status(400).json({ err });
    }
   
  }
  module.exports.category = async (req, res) => {
    const {category} = req.body;

    try {
      const user = await Categories.create({ category }); 
       console.log(user);
       res.redirect('/');
      res.status(201).json({ user: user._id });
    }
    catch(err) {
      res.status(400).json({ err });
    }
   
  }
  
  module.exports.show_products = async (req, res) => {
    try {
        const use = await User.find().populate('categories');
        res.render('porduct', { use });
        
        // res.status(200).json({ user });
      }
      catch(err) {
        res.status(400).json({ err });
      }
}
   
module.exports.show_category = async (req, res) => {
    try {
      const user = await Categories.find(); 
      res.status(200).json({ user });
    }
    catch(err) {
      res.status(400).json({ err });
    }
  }
  module.exports.details = async (req, res) => {
    const id = req.params.id;
      try {
        const returns = await User.findById(id).populate('categories');
        res.render('detail', { returns });
        res.status(200).json({ returns });
      }
      catch(err) {
        res.status(400).json({ err });
      }
    }
    module.exports.p_delete = async (req, res) => {
      const id = req.params.id;
      try{
      await User.findByIdAndDelete(id);
       
          res.json({ redirect: '/viewproduct' });
          // res.status(200).json('ok');
        }
        catch(err){ 
          res.status(400).json('error');
        };
    }
      
    exports.addToCart = async (req, res, next) => {
      const addedProduct =  await User.findById(req.params.id);
      Cart.save(addedProduct); 
      // console.log(addedProduct);
      res.json({ redirect: '/cart' });
  }

  exports.getCart = (req, res, next) => {
    // console.log(Cart.getproducts());
    // console.log(Cart.getqty());
    // console.log(Cart.gettotalPrice());

    res.render('cart',{ cart: Cart.getCart()});
  }
  exports.clear = (req, res, next) => {
    Cart.clear();
    res.redirect('/cart');
  }
  
  exports.deleteInCart = async (req, res, next) => {
    const Product = await req.params.id;
      Cart.delete(Product);
    // console.log(Product);
    res.redirect('/cart');
  }

  module.exports.placeorder = async (req, res) => {
    const { name , email , address , phone } = req.body;
    const user = await orders.create({  name , email , address , phone}); 
    const order = user._id;
    const priceitem = Cart.gettotalPrice();
    const product = Cart.getproducts();
  const itemqty = Cart.getqty();
    try {
       const orderpl = await orderdetails.create({  priceitem , order , product , itemqty});
      
       console.log(orderpl);
       Cart.clearall();
      res.status(201).json({ user: orderpl._id , usser: user._id });
    }
    catch(err) {
     
      res.status(400).json({ err });
    }
  }
  module.exports.show_order = async (req, res) => {
    try {
        const use = await orderdetails.find().populate('order').populate('product');
        res.render('vieworder', { use });
        
        // res.status(200).json({ user });
      }
      catch(err) {
        res.status(400).json({ err });
      }
}
module.exports.show_detail = async (req, res) => {
  
      const id = req.params.id;
      try {
        const returns = await orderdetails.findById(id).populate('order').populate('product').populate({ 
          path: 'product',
          populate: {
            path: 'categories',
            model: 'category'
          } 
       });
        // console.log(returns.product.category);
        res.render('viewdetail', { returns });
      
      // res.status(200).json({ user });
    }
    catch(err) {
      res.status(400).json({ err });
    }
}

module.exports.updata = async (req, res) => {
  const id = req.params.id;
  const {  name , price , number , description , categorie } = req.body;
  const image = req.file.filename;
  const categories = await Categories.findOne({category:categorie});
  try {
      const use = await User.findByIdAndUpdate({_id:id},{
        name:name,
        price:price,
        number:number,
        description:description,
        categories:categories,
        image:image,
      });
      res.redirect('/viewproduct');

      res.status(200).json({ use });
    }
    catch(err) {
      res.status(400).json({ err });
    }
}
module.exports.get_updata = async (req, res) => {
  const id = req.params.id;
  try{
  const up = await User.findById(id);
   
  res.render('updata', { up });
  // res.status(200).json('ok');
    }
    catch(err){ 
      res.status(400).json('err');
    };

}