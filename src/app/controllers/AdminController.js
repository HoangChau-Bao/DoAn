const config = require('../../config/db/dbconfig');
const sql = require('mssql');

class AdminController {
  //[GET] /admin/productmanage
  productmanage(req, res) {
    res.render('admin/productmanage');
  }
}

module.exports = new AdminController();
