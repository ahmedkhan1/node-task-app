const Joi = require('joi');

const createPost = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    content: Joi.string().required(),
  }),
};

const editPost = {
    body: Joi.object().keys({
        title: Joi.string(),
        content: Joi.string(),
        postId: Joi.number().required(),
    }),
};

const deletePost = {
    query: Joi.object().keys({
        postId: Joi.string().required(),
    }),
};
  
const commentPost = {
    body: Joi.object().keys({
        postId: Joi.number().required(),
        comment: Joi.string().required(),
    }),
};

module.exports = {
    createPost,
    editPost,
    deletePost,
    commentPost
};