// services/campaign.service.js

const { Op } = require("sequelize");
const db = require("../../models");
const User = db.User;

const UserService = {
  findUserDetails: async function(value) {
    try {
      return await User.findOne({
        attributes: [
          "id",
          'firstName', 
          'lastName', 
          'email',
          'role', 
        ],
        where: {
          [db.Sequelize.Op.or]: [
            { email: value },
          ]
        },
        include: [
          {
            model: db.Subscription,
          }
        ]
      });
    } catch (error) {
        console.log(error);
      throw new Error(`${error.message}`);
    }
  },
  createUser: async function(Obj) {
    try {
      return await User.create(Obj);
    } catch (error) {
      const msg = (error.original)? error.original.message : error.message;
      throw new Error(`${msg}`);
    }
  },
};

module.exports = UserService;