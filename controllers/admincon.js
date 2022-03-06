const User = require("../models/admin");
const jwt = require('jsonwebtoken');

// create json web token
const maxAge = 6 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, 'my secret', {
    expiresIn: maxAge
  });
};
module.exports.signup_post = async (req, res) => {
    const { email, password , name } = req.body;
    
    try {
      const user = await User.create({ email, password , name }); 
       console.log(user);
      const token = createToken(user._id);
      res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
      res.status(201).json({ user: user._id });
    }
    catch(err) {
      
      res.status(400).json({ err });
    }}
    module.exports.login_post = async (req, res) => {
        const { email, password } = req.body;
      
        try {
          const user = await User.login(email, password);
          const token = createToken(user._id);
          res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
          res.status(200).json({ user: user._id });
        } 
        catch (err) {
     
          res.status(400).json({ err });
        }
      
      }
      module.exports.logout_get = (req, res) => {
        res.cookie('jwt', '', { maxAge: 1 });
        res.redirect('/');
      }