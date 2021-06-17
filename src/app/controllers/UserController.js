const config = require('../../config/db/dbconfig');
const sql = require('mssql');
const { Store } = require('express-session');

class UserController {
  //[GET] /user/login
  login(req, res) {
    res.render('user/login');
  }

  //[GET] /user/logout
  logout(req, res) {
    req.logout();
    req.session.destroy();
    res.redirect('/');
  }

  //[GET] /user/giohang
  cart(req, res) {
    //if (req.isAuthenticated()) {
    res.render('product/cart');
    // } else {
    //   res.render('home', {
    //     errormessage: 'Bạn hãy đăng nhập để được xem giỏ hàng !',
    //   });
    // }
  }
}
module.exports = new UserController();
