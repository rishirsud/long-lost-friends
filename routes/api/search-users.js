const router = require('express').Router();


const {
  searchAllProfile,
  searchPSN,
  searchXbox,
  searchSteam
} = require('../../controllers/search-controller');

router
  .route("/all")
  .get(searchAllProfile);

router
  .route("/psn")
  .get(searchPSN);

router
  .route("/xbox")
  .get(searchXbox);

router
  .route("/steam")
  .get(searchSteam);

module.exports = router;