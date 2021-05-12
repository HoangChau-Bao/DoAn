const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../app/controllers/UserController');
const initPassportLocal = require('../app/controllers/auth/PassportController');

initPassportLocal();

router.get('/login', userController.login);
router.post(
  '/login',
  passport.authenticate('local', {
    failureRedirect: '/user/login',
    successRedirect: '/',
  }),
);

router.get('/cart', userController.cart);

module.exports = router;
