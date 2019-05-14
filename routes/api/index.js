// this file collects the other routes and provides the endpoint names
const router = require('express').Router();
// const userRoutes = require('./user-routes');
const allUsers = require('./all-users');

// prepend endpoints
// router.use('/user', userRoutes);
router.use('/all', allUsers);

module.exports = router;