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

router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// user profile
router.get('/users/:id', withAuth, async (req, res) => {
  try {
    // profile view should have user info and all chirps, with option to post new chirp
    const userData = await User.findByPk(req.params.id, {
      include: [{ model: Chirp }],
    });
    // serialize data so the template can read it
    const user = userData.get({ plain: true });
    // profile should display user data based on id
    res.render('profile', {
      user: user,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// login
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { email: req.body.email },
    });
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }
    const validPassword = await userData.checkPassword(req.body.password);
    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
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

// logout
router.post('/logout', withAuth, async (req, res) => {
  try {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
