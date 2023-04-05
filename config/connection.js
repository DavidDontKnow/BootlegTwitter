const Sequelize = require('sequelize');
require('dotenv').config(); // Load environment variables from .env file

let sequelize; // Initialize Sequelize

if (process.env.JAWSDB_URL) {
    sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
    sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
            host: 'localhost',
            dialect: 'mysql',
            port: 3306
        }
    );
}

// Please remember to have a .env file in your root directory with the following variables:\r\nDB_NAME=your_db_name\r\nDB_USER=your_db_user\r\nDB_PASSWORD=your_db_password


module.exports = sequelize;
