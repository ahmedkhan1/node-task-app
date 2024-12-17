// services/campaign.service.js

const { Op } = require("sequelize");
const db = require("../../models");
const User = db.User;
const EncrypterService = require("../Encrypter/encrypter.service");

const AuthService = {
  findUser: async function(params) {
    try {
      return await User.findOne({ 
        where: {
            email: params.email,
            password: params.password
        }
      });
    } catch (error) {
      console.log(error);
      throw new Error(`${error.message}`);
    }
  },
  findUserDetails: async function(value) {
    try {
      return await User.findOne({
        where: {
          [db.Sequelize.Op.or]: [
            { email: value },
          ]
        }
      });
    } catch (error) {
        console.log(error);
      throw new Error(`${error.message}`);
    }
  },
  findUserByEmailOrUserName: async function(value) {
    try {
      return await User.findOne({
        where: {
          [db.Sequelize.Op.or]: [
            { email: value },
          ]
        }
      });
    } catch (error) {
        console.log(error);
      throw new Error(`${error.message}`);
    }
  },

}

module.exports = AuthService;