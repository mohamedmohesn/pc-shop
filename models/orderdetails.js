const mongoose = require('mongoose');

const orderdetailSchema = new mongoose.Schema({
  priceitem: {
        type: Number,
        required: [true, 'Please enter a numberitem']
    },  
    order: {
      type: mongoose.Schema.Types.ObjectId , ref:'order'
    },
    product:[ {
        type: mongoose.Schema.Types.ObjectId , ref:'product'
    }],
    itemqty: {
      type: Number,
      required: [true, 'Please enter a numberitem']
  }, 
  });

  const orderdetail = mongoose.model('orderdetail', orderdetailSchema)
 
  module.exports = orderdetail;