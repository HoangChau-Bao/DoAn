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
    if (req.isAuthenticated()) {
      res.render('product/cart');
    } else {
      res.render('home', {
        errormessage: 'Bạn hãy đăng nhập để được xem giỏ hàng !',
      });
    }
  }

  register(req, res) {
    res.render('user/register');
  }

  registerstore(req, res) {
    console.log(req.body);
    sql.connect(config, (err, result) => {
      let str =
        "SELECT * FROM NguoiDung WHERE TaiKhoan = N'" + req.body.TaiKhoan + "'";
      let request = new sql.Request();
      if (err) {
        console.log('Error while querying database :- ' + err);
        throw err;
      } else {
        request.query(str, function (err, result) {
          if (err) {
            console.log('ERROR ' + err);
            throw err;
          } else {
            if (result.recordset.length != 0) {
              res.render('admin/newuser', {
                messages: 'Tài khoản đã tồn tại !',
              });
            } else {
              sql.connect(config, (err, result) => {
                let str =
                  "INSERT INTO NguoiDung VALUES ('" +
                  req.body.TaiKhoan +
                  req.body.Email +
                  "',N'" +
                  req.body.HoTen +
                  "', '" +
                  req.body.SDT +
                  "', N'" +
                  req.body.Email +
                  "', N'" +
                  req.body.DiaChi +
                  "', 'false', N'" +
                  req.body.TaiKhoan +
                  "', N'" +
                  req.body.MatKhau +
                  "', '1')";
                let request = new sql.Request();
                if (err) {
                  console.log('Error while querying database :- ' + err);
                  throw err;
                } else {
                  request.query(str, function (err, result) {
                    if (err) {
                      console.log('ERROR ' + err);
                      throw err;
                    } else {
                      res.redirect('/user/login');
                    }
                  });
                }
              });
            }
          }
        });
      }
    });
  }

  profile(req, res) {
    sql.connect(config, (err, nguoidung) => {
      let str =
        "SELECT * FROM NguoiDung WHERE TaiKhoan = '" + req.user.TaiKhoan + "'";
      let request = new sql.Request();
      if (err) {
        console.log('Error while querying database :- ' + err);
        throw err;
      } else {
        request.query(str, function (err, nguoidung) {
          if (err) {
            console.log('ERROR ' + err);
            throw err;
          } else {
            res.render('user/profile', { nguoidung: nguoidung.recordset });
          }
        });
      }
    });
  }

  profileupdate(req, res) {
    console.log(req.body);
    sql.connect(config, (err, nguoidung) => {
      let str =
        "UPDATE NguoiDung SET HoTen = N'" +
        req.body.Ho +
        "', SDT = '" +
        req.body.SoDienThoai +
        "', DiaChi = N'" +
        req.body.DiaChi +
        "' WHERE TaiKhoan = '" +
        req.body.TaiKhoan +
        "'";
      let request = new sql.Request();
      if (err) {
        console.log('Error while querying database :- ' + err);
        throw err;
      } else {
        request.query(str, function (err, nguoidung) {
          if (err) {
            console.log('ERROR ' + err);
            throw err;
          } else {
            res.redirect('/user/profile');
          }
        });
      }
    });
  }

  orderlist(req, res) {
    sql.connect(config, (err, result) => {
      let str =
        "SELECT hd.IDHoaDon, nd.HoTen, hd.NgayMuaHang, hd.NgayXacNhan, hd.TrangThai, hd.TongHoaDon, hd.DiaChiGiaoHang, hd.SoDienThoaiDatHang FROM hoadon hd LEFT JOIN nguoidung nd ON hd.IDKhachHang = nd.ID AND hd.IDKhachHang = '" +
        req.user.ID +
        "'";
      let request = new sql.Request();
      if (err) {
        console.log('Error while querying database :- ' + err);
        throw err;
      } else {
        request.query(str, function (err, hoadon) {
          if (err) {
            console.log('ERROR ' + err);
            throw err;
          } else {
            console.log(hoadon);
            //res.send(hoadon.recordset);
            res.render('user/orderlist', { hoadon: hoadon.recordset });
          }
        });
      }
    });
  }

  orderdetail(req, res) {
    console.log(req.query.IDHoaDon);
    sql.connect(config, (err, result) => {
      let str =
        ' SELECT CTHoaDon.IDHoaDon, CTHoaDon.IDCTHoaDon, DienThoai.TenDT, DienThoai.Gia, CTHoaDon.SoLuong, CTHoaDon.Tong FROM CTHoaDon INNER JOIN DienThoai ON CTHoaDon.IDHoaDon = ' +
        req.query.IDHoaDon +
        ' AND CTHoaDon.DienThoaiId = DienThoai.DienThoaiId';
      let request = new sql.Request();
      if (err) {
        console.log('Error while querying database :- ' + err);
        throw err;
      } else {
        request.query(str, function (err, result) {
          if (err) {
            console.log('ERROR ' + err);
            throw err;
          } else {
            res.render('user/orderdetail', { cthoadon: result.recordset });
          }
        });
      }
    });
  }
}
module.exports = new UserController();
