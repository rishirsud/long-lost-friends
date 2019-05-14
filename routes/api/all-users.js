const router = require('express').Router();

// const {
//   register,
//   login,
//   getUserProfile
// } = require('../../controllers/user-controller');

const allProfiles = require('../../controllers/all-controller');

// const withAuth = require('../../middleware/authentication');

router
  .route("/")
  .get(allProfiles);

module.exports = router;