const express = require('express');
const router = express.Router();
const { User, Chirp } = require('../../models');

const withAuth = require('../../utils/auth');

// get all chirps
router.get('/', async (req, res) => {
  try {
    const chirpData = await Chirp.findAll({
      include: [{ model: User }],
    });
    // json only, not sure if we're going to have a view for this
    res.status(200).json(chirpData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// new chirp
router.post('/', withAuth, async (req, res) => {
  try {
    const newChirp = await Chirp.create({
      content: req.body.chirp,
      user_id: req.session.user_id,
    });

    res.status(200).json(newChirp);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;
