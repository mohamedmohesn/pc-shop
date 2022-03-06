const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'Please enter an name'],
    },
    price: {
      type: Number,
      required: [true, 'Please enter an price'],
    },
    number: {
        type: Number,
        required: [true, 'Please enter an number'],
    },
    image: {
        type: String,
        required: [true, 'Please enter an image'],
    },
    description: {
        type: String,
        required: [true, 'Please enter an description'],
    },
    categories: {
        type: mongoose.Schema.Types.ObjectId , ref:'category',
        required: [true, 'Please enter an categories'],
    },

  });
  const product = mongoose.model('product', productSchema)
 
  module.exports = product;
   