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
      res.send(req.user);
    } else {
      res.send(req.user);
    }
  }

  test(req, res) {
    res.send(req.user);
  }
}
module.exports = new UserController();
