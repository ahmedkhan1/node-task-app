const express = require("express");
const controller = require("../../controllers/Admin/Admin.controller");
const validate = require("../../middleware/validate");
const { authJwt } = require("../../middleware");
const { auth } = require("../../validations/");
const { register } = auth;

const router = express.Router();

/**
 * @swagger
 * /admin/login:
 *   post:
 *     summary: Admin login
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Admin logged in successfully
 *       401:
 *         description: Invalid credentials
 */
router.post("/", authJwt, validate(register), controller.addAdmin);

module.exports = router;