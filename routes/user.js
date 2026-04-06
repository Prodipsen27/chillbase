const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync');
const passport = require('passport');
const userController = require('../controllers/userController.js');

// Signup
router.post('/signup', wrapAsync(userController.signup));

// Login
router.post('/login', passport.authenticate('local', { session: false }), userController.login);

// Logout
router.get('/logout', userController.logout);

module.exports = router;
