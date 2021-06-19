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

  search(req, res) {
    let str1 = "select * from dienthoai where TenDT = ''";
    if (req.query.search != '') {
      str1 += " Or TenDT LIKE '%" + req.query.search + "%'";
      console.log(str1);
    } else {
      if (req.query.iPhone)
        str1 += " or TenDT LIKE '%" + req.query.iPhone + "%'";
      if (req.query.SamSung)
        str1 += " or TenDT LIKE '%" + req.query.SamSung + "%'";
      if (req.query.Xiaomi)
        str1 += " or TenDT LIKE '%" + req.query.Xiaomi + "%'";
      if (req.query.Vivo) str1 += " or TenDT LIKE '%" + req.query.Vivo + "%'";
      if (req.query.OPPO) str1 += " or TenDT LIKE '%" + req.query.OPPO + "%'";
      if (req.query.Nokia) str1 += " or TenDT LIKE '%" + req.query.Nokia + "%'";
      //res.send(req.query);
      console.log(str1);
    }

    sql.connect(config, (err, dienthoai) => {
      let str = str1;
      console.log('str: ', str);
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
            if (dienthoai.recordset.length != 0)
              res.render('home', { dienthoai: dienthoai.recordset });
            else
              res.render('home', {
                errormessage: 'Không tìm thấy loại bạn đang tìm !',
              });
          }
        });
      }
    });
  }
}
module.exports = new SiteController();
