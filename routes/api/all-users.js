const router = require('express').Router();

// const {
//   register,
//   login,
//   getUserProfile
// } = require('../../controllers/user-controller');

const {
  getAllProfiles,
  searchAllProfile
} = require('../../controllers/search-controller');

// const withAuth = require('../../middleware/authentication');

router
  .route("/")
  .get(getAllProfiles);

router
  .route("/search")
  .get(searchAllProfile);

module.exports = router;