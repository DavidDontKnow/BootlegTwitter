const sequelize = require('../config/connection');
const { User, Chirp } = require('../models');


const userData = require('./userData.json');
const chirpData = require('./chirpData.json');


const seedDatabase = async () => {
    await sequelize.sync({ force: true });
    await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });
    await Chirp.bulkCreate(chirpData, {
        returning: true,
    });
    process.exit(0);
};

seedDatabase();
