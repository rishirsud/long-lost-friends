// var express = require("express");
// const { email, password/*, firstName, lastName*/ } = req.body;

const getAllProfiles = function (req, res) {

  let db = require("../models");

  console.log("GETTING ALL PROFILES");

  db.User.find({}, {
      firstName: 1,
      location: 1,
      steam: 1,
      psn: 1,
      xbox: 1
    })
    .then(function (dbUser) {
      res.json(dbUser);
    })
    .catch(function (err) {
      if (err) {
        console.log(err);
      }
    })
};

const searchAllProfile = function (req, res) {

  let db = require("../models");

  console.log("looking for all Bob");

  db.User.find({
      $or: [{
          psn: {
            $regex: 'bob',
            $options: "$i"
          }
        },
        {
          steam: {
            $regex: 'bob',
            $options: '$i'
          }
        },
        {
          xbox: {
            $regex: 'bob',
            $options: '$i'
          }
        }
      ]
    }, {
      firstName: 1,
      location: 1,
      steam: 1,
      psn: 1,
      xbox: 1
    })
    .then(function (dbUser) {
      res.json(dbUser);
    })
    .catch(function (err) {
      if (err) {
        console.log(err);
      }
    })
}

const searchPSN = function (req, res) {

  let db = require("../models");

  console.log("looking for psn Bob");

  db.User.find({
      $or: [{
          psn: {
            $regex: 'croc', /* use req.query */
            $options: "$i"
          }
        }
      ]
    }, {
      firstName: 1,
      location: 1,
      psn: 1,
    })
    .then(function (dbUser) {
      res.json(dbUser);
    })
    .catch(function (err) {
      if (err) {
        console.log(err);
      }
    })
}

const searchXbox = function (req, res) {

  let db = require("../models");

  console.log("looking for psn Bob");

  db.User.find({
      $or: [
        {
          xbox: {
            $regex: 'bob',
            $options: '$i'
          }
        }
      ]
    }, {
      firstName: 1,
      location: 1,
      xbox: 1,
    })
    .then(function (dbUser) {
      res.json(dbUser);
    })
    .catch(function (err) {
      if (err) {
        console.log(err);
      }
    })
}

const searchSteam = function (req, res) {

  let db = require("../models");

  console.log("looking for psn Bob");

  db.User.find({
      $or: [
        {
          steam: {
            $regex: 'croc',
            $options: '$i'
          }
        }
      ]
    }, {
      firstName: 1,
      location: 1,
      steam: 1,
    })
    .then(function (dbUser) {
      res.json(dbUser);
    })
    .catch(function (err) {
      if (err) {
        console.log(err);
      }
    })
}

module.exports = {
  getAllProfiles,
  searchAllProfile,
  searchPSN,
  searchXbox,
  searchSteam
};