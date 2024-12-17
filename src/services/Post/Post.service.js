// services/campaign.service.js

const { Op } = require("sequelize");
const db = require("../../models");
const Post = db.Post;

const PostService = {
  findPostDetails: async function(value) {
    try {
      return await Post.findOne({
        where: {
          [db.Sequelize.Op.or]: [
            { email: value },
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
  createPost: async function(Obj) {
    try {
      return await Post.create(Obj);
    } catch (error) {
      const msg = (error.original)? error.original.message : error.message;
      throw new Error(`${msg}`);
    }
  },
  editPost: async function(obj, postId, userId) {
    try {
      return await Post.update(
        { ...obj },
        {
            where: { id: postId, userId }
        }
    );
    } catch (error) {
      const msg = (error.original)? error.original.message : error.message;
      throw new Error(`${msg}`);
    }
  },
  deletePost: async function(postId, userId) {
    try {
      const result = await Post.destroy({
        where: {
          id: postId,
          userId,
        },
      });
  
      if (result === 0) {
        throw new Error('Post not found or you are not authorized to delete this post.');
      }
  
      return result;
    } catch (error) {
      const msg = error.original ? error.original.message : error.message;
      throw new Error(`${msg}`);
    }
  },
};

module.exports = PostService;