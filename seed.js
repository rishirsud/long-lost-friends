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
  location: "United States",
  steam: ["CrocodileHunter"],
  xbox: ["CrocodileHunter"],
  psn: ["CrocodileHunter", "KillerCroc", "Steve"],
};

// const sendStuff = [userSeed1, userSeed2]

db.User
  .remove({})
  .then(() => db.User.collection.insertMany([userSeed1, userSeed2]))
  .then(data => {
    console.log(data.result.n + " user inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });