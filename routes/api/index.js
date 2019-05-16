// this file collects the other routes and provides the endpoint names
const router = require('express').Router();
// const userRoutes = require('./user-routes');
const allUsers = require('./all-users');
const searches = require('./search-users');
const userRoutes = require("./user-routes");

// prepend endpoints
// router.use('/user', userRoutes);
router.use('/all', allUsers);
router.use('/search', searches);
router.use("/user", userRoutes)

module.exports = router;