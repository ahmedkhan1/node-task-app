const express = require("express");
const controller = require("../../controllers/User/User.controller");
const validate = require("../../middleware/validate");
const { auth, post } = require("../../validations/");
const { authJwt, rateLimiter } = require("../../middleware");
const { login, register } = auth;
const { createPost, editPost, deletePost, commentPost } = post;

const router = express.Router();

// Auth routes

/**
 * @swagger
 * /api/v1/user/login:
 *   post:
 *     summary: Login a user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: ahmed_khan019@hotmail.com
 *                 description: Email must have a minimum length of 3 characters.
 *                 minLength: 3
 *               password:
 *                 type: string
 *                 example: Ahmed@123
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid login credentials
 */
router.post("/login", rateLimiter, validate(login), controller.login);


/**
 * @swagger
 * /api/v1/user/register:
 *   post:
 *     summary: Register a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: John
 *               lastName:
 *                 type: string
 *                 example: Doe
 *               email:
 *                 type: string
 *                 example: john.doe@example.com
 *               password:
 *                 type: string
 *                 example: Password123!
 *               country:
 *                 type: string
 *                 example: USA
 *     responses:
 *       200:
 *         description: User registered successfully
 *       400:
 *         description: Email already in use
 */
router.post("/register", rateLimiter, validate(register), controller.register);

// Post routes

/**
 * @swagger
 * /api/v1/user/post:
 *   post:
 *     summary: Create a post
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: My first post
 *               content:
 *                 type: string
 *                 example: This is the content of the post.
 *     responses:
 *       200:
 *         description: Post created successfully
 *       400:
 *         description: Error creating post
 */
router.post("/post", rateLimiter, authJwt, validate(createPost), controller.createPosts);

/**
 * @swagger
 * /api/v1/user/post:
 *   put:
 *     summary: Edit a post
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               postId:
 *                 type: integer
 *                 example: 1
 *               title:
 *                 type: string
 *                 example: Updated post title
 *               content:
 *                 type: string
 *                 example: Updated content of the post.
 *     responses:
 *       200:
 *         description: Post updated successfully
 *       400:
 *         description: Error updating post
 */

router.put("/post", rateLimiter, authJwt, validate(editPost), controller.editPosts);



/**
 * @swagger
 * /api/v1/user/post:
 *   delete:
 *     summary: Delete a post
 *     tags: [User]
 *     parameters:
 *       - in: query
 *         name: postId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the post to delete
 *     responses:
 *       200:
 *         description: Post deleted successfully
 *       400:
 *         description: Error deleting post
 */
router.delete("/post", rateLimiter, authJwt, validate(deletePost), controller.deletePosts);

// Comment route
/**
 * @swagger
 * /api/v1/user/post/comment:
 *   post:
 *     summary: Post a comment
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               postId:
 *                 type: integer
 *                 example: 1
 *               comment:
 *                 type: string
 *                 example: This is a great post!
 *     responses:
 *       200:
 *         description: Comment posted successfully
 *       400:
 *         description: Error posting comment
 */
router.post("/post/comment", rateLimiter, authJwt, validate(commentPost), controller.postComments);


module.exports = router;