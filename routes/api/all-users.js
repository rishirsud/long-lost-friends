const router = require('express').Router();

// const {
//   register,
//   login,
//   getUserProfile
// } = require('../../controllers/user-controller');

const {
  getAllProfiles
} = require('../../controllers/search-controller');

// const withAuth = require('../../middleware/authentication');

router
  .route("/")
  .get(getAllProfiles);

module.exports = router;