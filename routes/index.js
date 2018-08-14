const express = require('express');
const router = express.Router();
const path = require('path');
const mongoose = require('mongoose');
// normally we'd refactor model-specific routes to their own controllers and
// wrap catchErrors on the imported functions for more modularity, but being lazy here
const { catchErrors } = require('../handlers/errorHandlers');

//import models
const User = mongoose.model('User');
const Exercise = mongoose.model('Exercise');

// root route
router.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, '../views/index.html'));
});

// user routes
router.get("/user", catchErrors(async (req, res) => {
  // first find if the username exists in our DB
  let existingUser = await User.findOne({ username: req.query.username })
  // if the user exists, we can proceed to query all exercises
  if (existingUser) {
    let exercises = await Exercise.find({ user: existingUser._id }).exec();
    res.send(exercises);
  } else {
    // otherwise, just respond with an error
    res.send(`username '${req.query.username}' does not exist`);
  }
}));

router.post("/user", catchErrors(async (req, res) => {
  let newUser = await (new User({ username: req.body.username })).save();
  res.json(newUser);
}));

// exercise routes
router.post("/exercise", catchErrors(async (req, res) => {
    // first find if the username exists in our DB
    let existingUser = await User.findOne({ username: req.body.username });
    // if the user exists, we can proceed to try and save POST a new exercise
    if (existingUser) {
      let newExercise = await (new Exercise({
        user: existingUser._id,
        description: req.body.description,
        duration: req.body.duration
      })).save();
      res.send(newExercise);
    } else {
      // otherwise, just respond with an error
      res.send(`username '${req.body.username}' does not exist`);
    }
  }));

module.exports = router;