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
    // console.log(req.isAuthenticated());
    // if (req.isAuthenticated()) {
    //   res.send('Đã đăng nhập với tài khoả: ' + req.user.TaiKhoan);
    // } else {
    //   res.send('Chưa đăng nhập');
    // }
    res.render('product/cart');
  }
}
module.exports = new UserController();
