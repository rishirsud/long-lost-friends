/* eslint-disable no-underscore-dangle */

// import dependencies
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const handle = require('../utils/promise-handler');


// set up secret for JWT (json web token)...typically you'd hide this in a .env
const secret = 'mysecretsshhhhh';

// create function to register/create a new user
// used when the POST route '/api/user/register' is hit
const register = (req, res) => {
  console.log(req.body)

  // get information about user out of req.body
  const { email, password/*, firstName, lastName*/ } = req.body;

  // create a new user
  const user = new User({email, password/*, firstName, lastName*/});

  // run setFullName()
  // user.setFullName();

  // create/save new user (this will trigger the password creation method we set up in the User model)
  user.save(err => {
    if (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Error registering new user, please try again."
      });
    }
    else {
      res.status(200).json({
        success: true,
        message: "Welcome to the club!"
      });
    }
  });

}

// function for logging in a user
// this will run when user POSTs to '/api/user/login'
const login = async (req, res) => {

  // get email and password out of req.body
  const { email, password } = req.body;

  // find user based on email
  const [ findUserErr, userInfo ] = await handle(User.findOne({email}));

  if (findUserErr) {
    console.log(findUserErr);
    res.status(500).json({
      error: "Internal error, try again"
    });
  }
  else if (!userInfo) {
    res.status(401).json({
      error: "Incorrect email"
    })
  }
  else {

    // check to see if password matches user's password
    const [pwErr, same] = await handle(userInfo.isCorrectPassword(password));

    if (pwErr) {
      res.status(500).json({
        error: "Internal error please try again!"
      });
    }
    else if (!same) {
      res.status(401).json({
        error: "Incorrect password!"
      });
    }
    else {
      // issue our JWT
      const payload = {
        _id: userInfo._id,
        email: userInfo.email
      }
      // sign jwt
      const token = jwt.sign(payload, secret, {
        expiresIn: '1h'
      });

      // respond with web token to the front end
      res.cookie('token', token, {httpOnly: true}).status(200).json(token);

      // if you want to use session cookies instead...
      // res.cookie('token', token, {httpOnly: true})
    }

  }
}

// get user profile
// GET '/api/user' (this will be run through auth middleware)
const getUserProfile = async (req,res) => {

  const [userErr, userProfile] = await handle(User.findById(req._id));

  if (userErr) {
    res.status(500).json(userErr);
  }
  else {
    res.status(200).json(userProfile);
  }
}

const updateProfile = async(req, res) => {
  if(!req.body){
    return res.status(400).send({
      message: "Requested content is empty"
    })
  };

  User.findByIdAndUpdate(req._id, {
    firstName: req.body.firstName,
    location: req.body.location,
    steam: req.body.steam, 
    xbox: req.body.xbox,
    psn: req.body.psn
  },
  {new: true})
  .then(User => {
    if(!User){
      return res.status(404).send({
        message: "User not found with id" + req.params._id
      });
    }
    res.send(User)
  }).catch(err => {
    if(err) console.log(err)
  })



  console.log(req.body)
}




// export our methods
module.exports = {
  getUserProfile,
  login,
  register,
  updateProfile
}
