const config = require('../../config/db/dbconfig');
const sql = require('mssql');
const { text } = require('express');

class AdminController {
  //[GET] /admin/productmanage
  productmanage(req, res) {
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
            res.render('admin/productmanage', {
              dienthoai: dienthoai.recordset,
            });
          }
        });
      }
    });
  }

  //[POST] /admin/productmanage/deleteproduct
  deleteproduct(req, res) {
    console.log(req.body);
    sql.connect(config, (err, dienthoai) => {
      let str =
        "DELETE FROM DienThoai WHERE DienThoaiId= '" +
        req.body.DienThoaiId +
        "';";
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
            res.redirect('/admin/productmanage');
          }
        });
      }
    });
  }

  //[GET] /admin/productmanage/addnewproductform
  addform(req, res) {
    res.render('admin/addproduct');
  }

  //[POST] /admin/productmanage/addnewproduct/store
  store(req, res) {
    //res.send(req.body.NgayRaMat);
    sql.connect(config, (err, dienthoai) => {
      let str =
        'INSERT INTO DienThoai (TenDT,ManHinh,CameraSau,CameraSelfie,Ram,BoNhoTrong,CPU,GPU,' +
        'DungLuongPin,TheSim,HeDieuHanh,XuatSu,NgayRaMat,Gia,Slug,ImageLink,MoTa,TrangThaiKinhDoanh) ' +
        "VALUES (N'" +
        req.body.TenDT +
        "', N'" +
        req.body.ManHinh +
        "', N'" +
        req.body.CameraSau +
        "', N'" +
        req.body.CameraSelfie +
        "', " +
        "N'" +
        req.body.Ram +
        "', N'" +
        req.body.BoNhoTrong +
        "', N'" +
        req.body.CPU +
        "', N'" +
        req.body.GPU +
        "', N'" +
        req.body.DungLuongPin +
        "', " +
        "N'" +
        req.body.TheSim +
        "', N'" +
        req.body.HeDieuHanh +
        "', N'" +
        req.body.XuatSu +
        "', '" +
        req.body.NgayRaMat +
        "', '" +
        req.body.Gia +
        "', " +
        "N'" +
        req.body.ManHinh +
        req.body.DienThoaiId +
        "', N'ImageLink', N'" +
        req.body.MoTa +
        "', 'true');";
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
            res.redirect('/admin/productmanage');
          }
        });
      }
    });
  }
}

module.exports = new AdminController();
