const express = require('express');
const router = express.Router();

const withAuth = require('../../utils/auth');

// homepage
router.get('/', withAuth, async (req, res) => {
  try {
    // homepage should have all chirps, with links
    res.render('homepage', {
      logged_in: req.session.logged_in,
    });
    res.status(200);
  } catch (err) {
    res.status(500).json(err);
  }
});

// login
router.get('/login', (req, res) => {
  // If user is logged in, redirect to user profile
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

// signup
router.get('/signup', (req, res) => {
  try {
    // If user is logged in, redirect to user profile
    if (req.session.logged_in) {
      res.redirect(`/users/${req.session.user_id}`);
      return;
    }
    // signup should have form to create new user
    res.render('signup');
    res.status(200);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;