const router = require('express').Router();
// const userHandler = require("../../controllers/controller")
const withAuth = require("../../middleware/authentication")


const {
  register,
  login,
  getUserProfile
} = require('../../controllers/user-controller.js');

// const withAuth = require('../../middleware/authentication');

// GET user profile '/api/user'
router
  .route('/')
  .get( withAuth, getUserProfile);

// POST register user

// http://localhost:3000/api/user/register
router
  .route('/register')
  .post(register);

// POST login user
// http://localhost:3000/api/user/login
router
  .route('/login')
  .post(login);

module.exports = router;