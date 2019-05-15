const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
var User = require("./models");
var jsonwebtoken = require("jsonwebtoken")


// set up app
const app = express();
const PORT = process.env.PORT || 3000;

// set up middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use(cookieParser());
app.use(function(req, res, next){
  if (req.headers && req.headers.authorization && req.headers.authorization.split(" ")[0] === 'JWT' ){
    jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIS', function(err, decode) {
      if (err) req.user = undefined;
      req.user = decode;
      next();
    });
  } else {
    req.user = undefined;
    next();
  }
})

// set up database info
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost/long-lost-friends';
mongoose.Promise = Promise;
mongoose.connect(mongoUri, {
  useNewUrlParser: true
});

// set up routes
const routes = require('./routes');

app.use(routes);





app.listen(PORT, () => console.log(`🗺️ => now listening on http://localhost:${PORT}`));