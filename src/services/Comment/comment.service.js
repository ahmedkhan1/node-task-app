// services/campaign.service.js

const { Op } = require("sequelize");
const db = require("../../models");
const Comment = db.Comment;

const CommentService = {
  findComments: async function(value) {
    try {
      return await Comment.findOne({
        where: {
          [db.Sequelize.Op.or]: [
            { id: value },
          ]
        },
        include: [
          {
            model: db.User,
          }
        ]
      });
    } catch (error) {
        console.log(error);
      throw new Error(`${error.message}`);
    }
  },
  createComment: async function(Obj) {
    try {
      return await Comment.create(Obj);
    } catch (error) {
      const msg = (error.original)? error.original.message : error.message;
      throw new Error(`${msg}`);
    }
  }
};

module.exports = CommentService;