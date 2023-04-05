const express = require('express');
const router = express.Router();
const { User, Chirp } = require('../../models');

const withAuth = require('../../utils/auth');

// user profile
router.get('/users/:id', async (req, res) => {
    try {
      // profile view should have user info and all chirps, with option to post new chirp
        const userData = await User.findByPk(req.params.id, {
          include: [{ model: Chirp }]
        });
        res.render('profile')
    } catch (err) {
        res.status(500).json(err);
    }
});

// new chirp
router.post('/chirps', withAuth, async (req, res) => {
    try {
        // create new chirp
        const newChirp = await Chirp.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.status(200).json(newChirp);
    } catch (err) {
        res.status(400).json(err);
    }
});