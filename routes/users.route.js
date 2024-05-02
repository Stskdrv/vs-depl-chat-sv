const User = require('../models/User.model');
const passport = require('passport');
const router = require('express').Router();

//get a user
router.get("/", passport.authenticate('jwt', {session: false}), async (req, res) => {
    const userId = req.query.userId;
    const username = req.query.username;
    try {
      const user = userId
        ? await User.findById(userId)
        : await User.findOne({ username: username });
      const { password, updatedAt, ...other } = user._doc;
      res.status(200).json(other);
    } catch (err) {
      res.status(500).json(err);
    }
});

// Get all users
router.get("/all", passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
      const users = await User.find();
      const sanitizedUsers = users.map(user => {
          const { password, updatedAt, ...other } = user._doc;
          return other;
      });
      res.status(200).json(sanitizedUsers);
  } catch (err) {
      res.status(500).json(err);
  }
});

  

module.exports = router;