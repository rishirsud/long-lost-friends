const router = require('express').Router();

// const {
//   register,
//   login,
//   getUserProfile
// } = require('../../controllers/user-controller');

const {
  getAllProfiles,
  searchAllProfile,
  // searchPSN,
  // searchXbox,
  // searchSteam
} = require('../../controllers/search-controller');

// const withAuth = require('../../middleware/authentication');

router
  .route("/")
  .get(getAllProfiles);

router
  .route("/search")
  .get(searchAllProfile);

// router
//   .route("/search/psn")
//   .get(searchPSN);

// router
//   .route("/search/xbox")
//   .get(searchXbox);

// router
//   .route("/search/steam")
//   .get(searchSteam);

module.exports = router;