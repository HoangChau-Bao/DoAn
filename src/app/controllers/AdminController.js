const config = require('../../config/db/dbconfig');
const sql = require('mssql');
const fileupload = require('express-fileupload');
const { text } = require('express');
const dateFormat = require('dateformat');

class AdminController {
  //[GET] /admin/productmanage
  productmanage(req, res) {
    // if (req.isAuthenticated()) {
    //   if (req.user.ChucVu) {
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
  //else {
  //     res.redirect('/');
  //   }
  // } else {
  //   res.redirect('/');
  // }
  //}

  usermanage(req, res) {
    // if (req.isAuthenticated()) {
    //   if (req.user.ChucVu) {
    sql.connect(config, (err, result) => {
      let str = 'SELECT * FROM NguoiDung';
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
            console.log(result.recordset);
            res.render('admin/usermanage', {
              nguoidung: result.recordset,
            });
          }
        });
      }
    });
  }
  //else {
  //     res.redirect('/');
  //   }
  // } else {
  //   res.redirect('/');
  // }
  //}

  //[GET] /admin/productmanage/addnewproductform
  addform(req, res) {
    res.render('admin/addproduct');
  }

  //[POST] /admin/productmanage/addnewproduct/store
  store(req, res) {
    //res.send(req.body.NgayRaMat);
    let sampleFile = req.files.Image;
    let uploadPath = 'src/public/img/' + req.body.DienThoaiId + sampleFile.name;
    sampleFile.mv(uploadPath, (err) => {
      if (err) return res.send(err);
    });
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
        req.body.TenDT +
        req.body.NgayRaMat +
        "', N'" +
        req.body.NgayRaMat +
        sampleFile.name +
        "', N'" +
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

  //[POST] /admin/productmanage/deleteproduct
  deleteproduct(req, res) {
    console.log(req.body);
    if (req.body.TrangThaiKinhDoanh == 'false') {
      sql.connect(config, (err, dienthoai) => {
        let str =
          "DELETE FROM DienThoai WHERE DienThoaiId= '" +
          req.body.DienThoaiId +
          "' AND TrangThaiKinhDoanh = 0;";
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

  //[POST] /admin/productmanage/changeprostatus
  changeprostatus(req, res) {
    console.log(today);
    if (req.body.TrangThaiKinhDoanh == 'false') {
      sql.connect(config, (err, dienthoai) => {
        let str =
          'UPDATE DienThoai SET TrangThaiKinhDoanh = 1 WHERE DienThoaiId = ' +
          req.body.DienThoaiId +
          '';
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
    } else {
      sql.connect(config, (err, dienthoai) => {
        let str =
          'UPDATE DienThoai SET TrangThaiKinhDoanh = 0 WHERE DienThoaiId = ' +
          req.body.DienThoaiId +
          '';
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

  ordermanage(req, res) {
    sql.connect(config, (err, result) => {
      let str =
        'SELECT hd.IDHoaDon, nd.HoTen, hd.NgayMuaHang, hd.NgayXacNhan, hd.TrangThai, hd.TongHoaDon, hd.DiaChiGiaoHang, hd.SoDienThoaiDatHang FROM hoadon hd LEFT JOIN nguoidung nd ON hd.IDKhachHang = nd.ID';
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
            res.render('admin/ordermanage', { hoadon: hoadon.recordset });
          }
        });
      }
    });
  }

  confirmbill(req, res) {
    let trangthai = true;
    console.log(req.body.IDHoaDon);
    sql.connect(config, (err, result) => {
      let str =
        'SELECT TOP 1 * FROM HoaDon WHERE IDHOADON = ' + req.body.IDHoaDon + '';
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
            console.log(hoadon.recordset[0].TrangThai);
            trangthai = hoadon.recordset[0].TrangThai;

            if (trangthai == false) {
              var today = dateFormat(new Date(), 'yyyy/mm/dd');
              sql.connect(config, (err, result) => {
                let str =
                  "UPDATE HoaDon SET TrangThai = 1, NgayXacNhan = '" +
                  today +
                  "' WHERE IDHOADON = " +
                  req.body.IDHoaDon +
                  '';
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
                      res.redirect('/admin/ordermanage');
                    }
                  });
                }
              });
            } else {
              return true;
            }
          }
        });
      }
    });
  }

  deletebill(req, res) {
    let trangthai = true;
    console.log(req.body.IDHoaDon);
    sql.connect(config, (err, result) => {
      let str =
        'SELECT TOP 1 * FROM HoaDon WHERE IDHOADON = ' + req.body.IDHoaDon + '';
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
            console.log(hoadon.recordset[0].TrangThai);
            trangthai = hoadon.recordset[0].TrangThai;

            if (trangthai == false) {
              sql.connect(config, (err, result) => {
                let str =
                  'DELETE HoaDon WHERE IDHOADON = ' + req.body.IDHoaDon + '';
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
                      sql.connect(config, (err, result) => {
                        let str =
                          'DELETE CTHoaDon WHERE IDHOADON = ' +
                          req.body.IDHoaDon +
                          '';
                        let request = new sql.Request();
                        if (err) {
                          console.log(
                            'Error while querying database :- ' + err,
                          );
                          throw err;
                        } else {
                          request.query(str, function (err, hoadon) {
                            if (err) {
                              console.log('ERROR ' + err);
                              throw err;
                            } else {
                              res.redirect('/admin/ordermanage');
                            }
                          });
                        }
                      });
                    }
                  });
                }
              });
            } else {
              return true;
            }
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
            res.render('admin/orderdetail', { cthoadon: result.recordset });
          }
        });
      }
    });
  }

  changeuserstatus(req, res) {
    //res.send(req.body.ID);
    sql.connect(config, (err, result) => {
      let str = 'SELECT TOP 1 * FROM NguoiDung WHERE ID = ' + req.body.ID + '';
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
            console.log(nguoidung.recordset[0].TrangThai);
            let trangthai = nguoidung.recordset[0].TrangThai;

            if (trangthai == false) {
              sql.connect(config, (err, result) => {
                let str =
                  'UPDATE NguoiDung SET TrangThai = 1 WHERE ID = ' +
                  req.body.ID +
                  '';
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
                      res.redirect('/admin/usermanage');
                    }
                  });
                }
              });
            } else {
              sql.connect(config, (err, result) => {
                let str =
                  'UPDATE NguoiDung SET TrangThai = 0 WHERE ID = ' +
                  req.body.ID +
                  '';
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
                      res.redirect('/admin/usermanage');
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

  newuser(req, res) {
    res.render('admin/newuser');
  }

  newuserstore(req, res) {
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
                  "', '" +
                  req.body.ChucVu +
                  "', N'" +
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
                      res.redirect('/admin/usermanage');
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
}

module.exports = new AdminController();
