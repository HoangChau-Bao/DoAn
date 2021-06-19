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

//router.get('/test', userController.test); //test case authenticated
router.get('/logout', userController.logout);
router.get('/cart', userController.cart);
router.get('/profile', userController.profile);
router.get('/register', userController.register);
router.get('/history', userController.orderlist);
router.get('/orderdetail', userController.orderdetail);
router.post('/registerstore', userController.registerstore);
router.post('/profileupdate', userController.profileupdate);

module.exports = router;
