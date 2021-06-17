const config = require('../../config/db/dbconfig');
const sql = require('mssql');

class ApiControler {
  castcart(req, res) {
    console.log(req.cookies);
  }
}
module.exports = new ApiControler();
