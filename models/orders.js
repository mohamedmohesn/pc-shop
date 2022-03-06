const mongoose = require('mongoose');
const { isEmail } = require('validator');

const orderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter a name']
    },  
    email: {
      type: String,
      required: [true, 'Please enter an email'],
      lowercase: true,
      validate: [isEmail, 'Please enter a valid email']
    },
    address: {
      type: String,
      required: [true, 'Please enter a address']
    },
    phone: {
        type: String,
        required: [true, 'Please enter a phone']
     },
  });

  const order = mongoose.model('order', orderSchema)
 
  module.exports = order;