const passport = require('passport');
const passportLocal = require('passport-local');
const config = require('../../../config/db/dbconfig');
const sql = require('mssql');

let LocalStrategy = passportLocal.Strategy;
let taikhoan = '';
let matkhau = '';
let trangthai = false;
let user = null;
let initPassportLocal = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'TaiKhoan',
        passwordField: 'MatKhau',
        passReqToCallback: true,
      },
      (req, TaiKhoan, MatKhau, done) => {
        try {
          sql.connect(config, (err, NguoiDung) => {
            let str =
              "SELECT * FROM NguoiDung WHERE TaiKhoan= '" + TaiKhoan + "'";
            let request = new sql.Request();
            request.query(str, function (err, NguoiDung) {
              taikhoan = '';
              matkhau = '';
              if (NguoiDung.recordset.length != 0) {
                console.log(NguoiDung.recordset);
                user = NguoiDung.recordset[0];
                taikhoan = user.TaiKhoan;
                matkhau = user.MatKhau;
                trangthai = user.TrangThai;

                console.log(user);
                if (taikhoan == '') {
                  return done(null, false);
                }
                if (matkhau == '') {
                  return done(null, false);
                }
                if (trangthai == false) {
                  return done(null, false);
                }
                console.log(user);
                return done(null, user);
              } else {
                taikhoan = '';
                matkhau = '';

                console.log('Sai ten dang nhap hoac tai khoan');
                return done(null, false);
              }
            });
          });

          //let user = await UserModel.findByEmail(TaiKhoan);

          //let checkPassword = await(user.comparePassword(MatKhau));
        } catch (error) {
          console.log(error);
          return done(null, false);
        }
      },
    ),
  );
};

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

module.exports = initPassportLocal;
