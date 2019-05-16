const mongoose = require("mongoose");
const db = require("./models");

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/long-lost-friends"
);

const userSeed1 = {
  email: "test@test.com",
  password: "password",
  firstName: "Bob",
  lastName: "Ross",
  fullName: "Bob Ross",
  location: "United States",
  steam: ["BobThePainter"],
  xbox: ["BobTheBuilder"],
  psn: ["BobTheDestroyer"],
};

const userSeed2 = {
  email: "Steve@irwin.com",
  password: "crikey",
  firstName: "Steve",
  lastName: "Irwin",
  fullName: "Steve Irwin",
  location: "Australia",
  steam: ["CrocodileHunter"],
  xbox: ["steveHunter"],
  psn: ["CrocodileHunter", "KillerCroc", "Steve"],
};

const userSeed3 = {
  email: "otherSteve@somewhere.com",
  password: "hunter7",
  firstName: "Steve",
  lastName: "S",
  fullName: "Steve S",
  location: "United States",
  steam: ["SteveSteve"],
  xbox: ["SteveXboxSteve"],
  psn: ["StevePSNSteve", "hunwiowoenfowe", "wfkwje fwkej f"],
};

const userSeed4 = {
  email: "steve@somwhereelse.com",
  password: "peanuts",
  firstName: "Steve",
  lastName: "B",
  fullName: "Steve B",
  location: "United States",
  steam: ["SteveSTEAMwuebfiweubfiwb"],
  xbox: ["SteveXboxeiwoienf"],
  psn: ["wenwoein", "ownfowi", "kjwwofnwoe"],
};

// const sendStuff = [userSeed1, userSeed2]

db.User
  .remove({})
  .then(() => db.User.collection.insertMany([userSeed1, userSeed2, userSeed3, userSeed4]))
  .then(data => {
    console.log(data.result.n + " user inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });