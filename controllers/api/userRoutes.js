const express = require('express');
const router = express.Router();
const { User, Chirp } = require('../../models');

const withAuth = require('../../utils/auth');

// get all users
router.get('/', async (req, res) => {
  try {
    const userData = await User.findAll({
      include: [{ model: Chirp }],
    });
    // json only, not sure if we're going to have a view for this
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// user profile
router.get('/users/:id', withAuth, async (req, res) => {
  try {
    // profile view should have user info and all chirps, with option to post new chirp
    const userData = await User.findByPk(req.params.id, {
      include: [{ model: Chirp }],
    });
    // profile should display user data based on id
    res.render('profile');
  } catch (err) {
    res.status(500).json(err);
  }
});

// login
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { username: req.body.username },
    });
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }
    const validPassword = await userData.checkPassword(req.body.password);
    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res
        .status(200)
        .json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});
