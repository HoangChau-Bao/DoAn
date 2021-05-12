const config = require('../../config/db/dbconfig');
const sql = require('mssql');

class SiteController {
  //[GET] /#home
  index(req, res, next) {
    //console.log(config.userName);
    sql.connect(config, (err, dienthoai) => {
      let str = 'SELECT * FROM DienThoai';
      let request = new sql.Request();
      if (err) {
        console.log('Error while querying database :- ' + err);
        throw err;
      } else {
        request.query(str, function (err, dienthoai) {
          if (err) {
            console.log('ERROR ' + err);
            throw err;
          } else {
            res.render('home', { dienthoai: dienthoai.recordset });
          }
        });
      }
    });
  }
}
module.exports = new SiteController();
