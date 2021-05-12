const config = require('../../config/db/dbconfig');
const sql = require('mssql');

class UserController {
  //[GET] /login
  login(req, res) {
    res.render('user/login');
  }

  //[GET] /user/giohang
  cart(req, res) {
    if (req.isAuthenticated()) {
      res.send('Cart');
    } else {
      res.send('No cart');
    }
  }
}
module.exports = new UserController();
