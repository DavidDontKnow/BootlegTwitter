const router = require('express').Router();
const userRoutes = require('./userRoutes');
const chirpRoutes = require('./chirpRoutes');

router.use('/users', userRoutes);
router.use('/chirps', chirpRoutes);

module.exports = router;
