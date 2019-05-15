const router = require('express').Router();


const {
  searchPSN,
  searchXbox,
  searchSteam
} = require('../../controllers/search-controller');

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