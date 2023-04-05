const User = require('./User');
const Chirp = require('./Chirp');

User.hasMany(Chirp, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Chirp.belongsTo(User, {
  foreignKey: 'user_id',
});

module.exports = { User, Chirp };
