const config = require('../../config/db/dbconfig');
const sql = require('mssql');
const dateFormat = require('dateformat');

class ApiControler {
  castcart(req, res, err) {
    var cartitemList = [];
    if (req.cookies.cartItemList != undefined) {
      cartitemList = JSON.parse(req.cookies.cartItemList);
    }

    if (cartitemList.length == 0) {
      console.log('cart: ', cartitemList);
      res.render('home', {
        errormessage: 'Giỏ hàng của bạn đang rỗng !',
      });
    } else {
      console.log('user: ', req.user);
      console.log('cart: ', cartitemList);
      var date = new Date();
      var today = dateFormat(new Date(), 'yyyy/mm/dd');
      var total = 0;
      for (let i = 0; i < cartitemList.length; i++) {
        total += cartitemList[i].price * cartitemList[i].quantity;
      }

      sql.connect(config, (err, result) => {
        let str =
          'INSERT INTO HoaDon VALUES (' +
          req.user.ID +
          ",'" +
          today +
          "','',0," +
          total +
          ", N'" +
          req.user.DiaChi +
          "', N'" +
          req.user.SDT +
          "')";
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
              console.log('sql ok!');

              var IDHoaDon;
              sql.connect(config, (err, result) => {
                let str = 'SELECT TOP 1 * FROM HoaDon ORDER BY IDHoaDon DESC';
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
                      IDHoaDon = result.recordset[0].IDHoaDon;
                      console.log('idhoadon', IDHoaDon);

                      var str2 = '';
                      for (let i = 0; i < cartitemList.length; i++) {
                        sql.connect(config, (err, result) => {
                          str2 =
                            'INSERT INTO CTHoaDon VALUES (' +
                            IDHoaDon +
                            ', ' +
                            cartitemList[i].dienthoaiid +
                            ', ' +
                            cartitemList[i].price +
                            ', ' +
                            cartitemList[i].quantity +
                            ' , ' +
                            parseInt(cartitemList[i].price) *
                              parseInt(cartitemList[i].quantity) +
                            ');';
                          let request = new sql.Request();
                          if (err) {
                            console.log(
                              'Error while querying database :- ' + err,
                            );
                            throw err;
                          } else {
                            request.query(str2, function (err, result) {
                              if (err) {
                                console.log('ERROR ' + err);
                                throw err;
                              } else {
                                console.log('sql ok!', i);
                                console.log(result);
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
          });
        }
      });

      var cart = [];
      res.clearCookie('cartItemList');
      res.render('home', {
        errormessage: 'Đặt hàng thành công !',
      });
    }
  }
}
module.exports = new ApiControler();
