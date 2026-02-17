const express = require('express');
const { register, login, logout, forgetPassword, resetPassword, getMe } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.post('/forgetPassword', forgetPassword);
authRouter.post('/resetPassword', resetPassword);
authRouter.get('/me', authMiddleware, getMe);

module.exports = authRouter;