const router = require('express').Router();
const apiRoutes = require('./api');
const path = require('path');
const pageAuth = require('../middleware/page-authentication');

router.use('/api', apiRoutes);

// router.use('/profile', function (req, res) {
//   res.sendFile(path.join(__dirname, "../public/profile.html"));
// });

router.get('/profile', pageAuth, function (req, res) {
  res.sendFile(path.join(__dirname, "../public/profile.html"));
});

router.use((req, res) => {
  res.json({
    message: "Where are you? 404 Bro"
  })
});

module.exports = router;