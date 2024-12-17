// services/campaign.service.js

const { Op } = require("sequelize");
const db = require("../../models");
const UserActivity = db.UserActivity;

const UserActivityService = {
  getUserActivityById: async function(userId) {
    try {
      return await UserActivity.findOne({
        where: {
          UserActivityID: userId
        },
        order: [
          ['UserActivityID', 'DESC']
        ]
      });
    } catch (error) {
      console.log(error);
      throw new Error(`${error.message}`);
    }
  },
  updateUser: async function(Obj) {
    try {
      return await UserActivity.update(Obj);
    } catch (error) {
      throw new Error(`${error.message}`);
    }
  },
};

module.exports = UserActivityService;