const User = require('../models/User.model');
const EncrypterService = require('../services/Encrypter/encrypter.service');

const seedAdmin = async (sequelize) => {
  const hashedPassword = EncrypterService.hashEncrypt("admin123");
  await sequelize.models.User.findOrCreate({
    where: { email: 'admin@example.com' },
    defaults: {
      firstName: 'Default',
      lastName: 'Admin',
      email: 'admin@example.com',
      country: 'USA',
      password: hashedPassword,
      role: 'admin',
      verified: true,
    },
  });
};

module.exports = seedAdmin;
