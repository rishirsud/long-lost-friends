const mongoose = require("mongoose");
const db = require("./models");

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/long-lost-friends"
);

const userSeed = [
  {
email: "test@test.com",
password: "password",
firstName: "Bob",
lastName: "Ross",
fullName: "Bob Ross",
steam:["BobThePainter"],
xbox: ["BobTheBuilder"],
psn: ["BobTheDestroyer"],
  }
];

db.User
  .remove({})
  .then(() => db.User.collection.insertMany(userSeed))
  .then(data => {
    console.log(data.result.n + " user inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });