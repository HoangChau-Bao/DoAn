const config = require('../../config/db/dbconfig');
const sql = require('mssql');

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
    console.log(req.isAuthenticated());
    if (req.isAuthenticated()) {
      res.send('Đã đăng nhập với tài khoả: ' + req.user.TaiKhoan);
    } else {
      res.send('Chưa đăng nhập');
    }
  }

  test(req, res) {
    res.send(req.user);
  }
}
module.exports = new UserController();
