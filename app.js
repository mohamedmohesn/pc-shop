const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const multer = require('multer');
const product = require('./Routes/productRoutes');
const { requireAuth, checkUser } = require('./middlewares/middleware');
const Routes = require('./Routes/adminRoutes');
const Cart = require('./models/cart');

require('dotenv').config()
const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

// view engine
app.set('view engine', 'ejs');  
  
// database connection
const port = app.listen(process.env.PORT || 3000)

const dbURI = process.env.KEYURL;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true , useFindAndModify:false})
  .then((result) => console.log("3000"))
  .catch((err) => console.log(err));

// routes
app.get('*', checkUser);
app.get('/', (req, res)=> {Cart.clear() ;res.render('home'); }); 
app.get('/login', (req, res) => res.render('login'));
app.get('/addadmin', (req, res) => res.render('add'));
app.get('/addproduct', (req, res) => res.render('addproduct'));
app.get('/order-place', (req, res) => res.render('placeorder'));

//   app.get('/update', requireAuth, (req, res) => res.render('update'));
//   app.get('/Account', requireAuth, (req, res) => res.render('account'));
app.use(Routes);
app.use(product);
app.use('/app/uploads',express.static('uploads'));

