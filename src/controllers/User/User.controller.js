/**
 * @swagger
 * tags:
 *   name: User
 *   description: User management and operations
 */


const { commonMethods } = require('../../utils/common');
const logs = require('../../../logger');
const UserService = require('../../services/User/User.service');
const AuthService = require('../../services/Auth/auth.service');
const EncrypterService = require('../../services/Encrypter/encrypter.service');
const messages = require('../../utils/messages');
const PostService = require('../../services/Post/Post.service');
const CommentService = require('../../services/Comment/Comment.service');

/* -------- USER CONTROLLER -------- */

/**
 *  Login, register.
 * @public
 */

const login = async (req, res, next) => {
   try {
      // Authenticate user by username and password
      const { email, password } = req.body;
      const data = await AuthService.findUserDetails(email);
      const inputPassword = EncrypterService.hashEncrypt(password);

      if(data && data.email){
         if(data.password === inputPassword) {
   
            // Return responseMSg in API response
            let responseObj = {};

            const apiToken = commonMethods.generateJwtToken({...req.body, userId: data.id, role: data.role,});
            responseObj = {
               email: data.email,
               firstName: data.firstName,
               role: data.role,
               authToken: apiToken,
            };
            commonMethods.handleApiResponse(res, false, responseObj, "Success");
         } else {
            logs.error("Error Login function: " + "Invalid login attempt");
            commonMethods.handleApiResponse(res, true, {}, messages.error.invalidLoginCredentials);
         }
      } else {
         logs.error("Error Login function: " + "User not found");
         commonMethods.handleApiResponse(res, true, {}, messages.error.invalidLoginCredentials);
      }

   } catch (err) {
      logs.error("Error Login function: " + err.message);
      commonMethods.handleApiResponse(res, true, {}, err);
   }
};

const register = async (req, res, next) => {
   try {
      const { firstName, lastName, email, password, country } = req.body;

      const isExist = await AuthService.findUserByEmailOrUserName(email);
      if(isExist){
         commonMethods.handleApiResponse(res, true, {}, "Email already in use.");  
         return;
      }

      // Register User
      const params = {
         firstName,
         lastName,
         country,
         email,
         password: EncrypterService.hashEncrypt(password),
      }
      const data = await UserService.createUser(params);
      
      if(data) {
         console.log('Creation successfull.');
         commonMethods.handleApiResponse(res, false, {}, "Success");
      } else {
         commonMethods.handleApiResponse(res, true, {}, "Error creating user.");
      }

   } catch (err) {
      logs.error("Error register function: " + err.message);
      commonMethods.handleApiResponse(res, true, {}, err.message);
   }
};

const createPosts = async (req, res, next) => {
   try {

      const { title, content } = req.body;

      // Create Post
      const params = {
         title, 
         content, 
         userId: req.user.userId
      }
      const data = await PostService.createPost(params);
      
      if(data) {
            console.log('Creation successfull.');
         commonMethods.handleApiResponse(res, false, {}, "Success");
      } else {
         commonMethods.handleApiResponse(res, true, {}, "Error creating Post.");
      }

   } catch (err) {
      logs.error("Error createPosts function: " + err.message);
      commonMethods.handleApiResponse(res, true, {}, err.message);
   }
};

const editPosts = async (req, res, next) => {
   try {
      const { title, content, postId } = req.body;

      if(!title && !content) {
         commonMethods.handleApiResponse(res, true, {}, "At least one param is required.");  
         return;
      }

      // Edit Post
      let params = {};

      if(title) params['title'] = title;
      if(content) params['content'] = content;

      const data = await PostService.editPost(params, postId, req.user.userId);
      
      if(data) {
         console.log('Edit successfull.');
         commonMethods.handleApiResponse(res, false, {}, "Success");
      } else {
         commonMethods.handleApiResponse(res, true, {}, "Error editing Post.");
      }

   } catch (err) {
      logs.error("Error editPosts function: " + err.message);
      commonMethods.handleApiResponse(res, true, {}, err.message);
   }
};

const deletePosts = async (req, res, next) => {
   try {
      const { postId } = req.query;
      const data = await PostService.deletePost(postId, req.user.userId);
      
      if(data) {
         console.log('Deleting successfull.');
         commonMethods.handleApiResponse(res, false, {}, "Success");
      } else {
         commonMethods.handleApiResponse(res, true, {}, "Error deleting Post.");
      }

   } catch (err) {
      logs.error("Error deletePosts function: " + err.message);
      commonMethods.handleApiResponse(res, true, {}, err.message);
   }
};

const postComments = async (req, res, next) => {
   try {
      const { postId, comment } = req.body;

      // Create Comment
      const params = {
         content: comment, 
         postId, 
         userId: req.user.userId
      }
      const data = await CommentService.createComment(params);
      
      if(data) {
         console.log('Comment successfull.');
         commonMethods.handleApiResponse(res, false, {}, "Success");
      } else {
         commonMethods.handleApiResponse(res, true, {}, "Error creating Comment.");
      }

   } catch (err) {
      logs.error("Error postComments function: " + err.message);
      commonMethods.handleApiResponse(res, true, {}, err.message);
   }
};


module.exports = {
   login,
   register,
   createPosts,
   editPosts,
   deletePosts,
   postComments
};
