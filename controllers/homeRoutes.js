const express = require('express');
const router = express.Router();
const { User, Chirp } = require('../models');

const withAuth = require('../utils/auth');

// homepage
router.get('/', withAuth, async (req, res) => {
  try {
    const chirpData = await Chirp.findAll({
      include: [{ model: User }],
    });
    // serialize data so the template can read it
    const chirps = chirpData.map((chirp) => chirp.get({ plain: true }));

    // homepage should have all chirps and navbar links
    res.render('homepage', {
      chirps,
      logged_in: req.session.logged_in,
    });
    res.status(200);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// login page
router.get('/login', (req, res) => {
  // if user is logged in, redirect to user profile
  try {
    if (req.session.logged_in) {
      res.redirect(`/users/${req.session.user_id}`);
      return;
    }
    // login should have form to login
    res.render('login');
    res.status(200);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// signup page
router.get('/signup', (req, res) => {
  try {
    // if user is logged in, redirect to user profile
    if (req.session.logged_in) {
      res.redirect(`/users/${req.session.user_id}`);
      return;
    }
    // signup should have form to create new user
    res.render('homepage', {
      logged_in: req.session.logged_in,
    });
    res.status(200);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// profile page
router.get('/profile', withAuth, async (req, res) => {
  try {
    // get all chirps for user
    const chirpData = await Chirp.findAll({
      where: {
        user_id: req.session.user_id,
      },
      include: [{ model: User }],
    });
    // serialize data so the template can read it
    const chirps = chirpData.map((chirp) => chirp.get({ plain: true }));
    // get user data
    const userData = await User.findByPk(req.session.user_id);
    // serialize data so the template can read it
    const user = userData.get({ plain: true });

    res.render('profile', {
      chirps,
      user,
      logged_in: req.session.logged_in,
    });
    res.status(200);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
