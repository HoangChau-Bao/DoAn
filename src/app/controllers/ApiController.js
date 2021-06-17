const config = require('../../config/db/dbconfig');
const sql = require('mssql');

class ApiControler {
  castcart(req, res, err) {
    var cartitemList = [];
    if (req.cookies.cartItemList != undefined) {
      cartitemList = JSON.parse(req.cookies.cartItemList);
    }

    if (cartitemList.length == 0) {
      console.log('cart: ', cartitemList);
      res.status(400).send('null');
    } else {
      console.log('user: ', req.user);
      console.log('cart: ', cartitemList);

      // sql.connect(config, (err, dienthoai) => {
      //   let str = 'INSERT INTO HoaDon ';
      //   let request = new sql.Request();
      //   if (err) {
      //     console.log('Error while querying database :- ' + err);
      //     throw err;
      //   } else {
      //     request.query(str, function (err, dienthoai) {
      //       if (err) {
      //         console.log('ERROR ' + err);
      //         throw err;
      //       } else {
      //         res.render('admin/productmanage', {
      //           dienthoai: dienthoai.recordset,
      //         });
      //       }
      //     });
      //   }
      // });

      var cart = [];
      res.clearCookie('cartItemList');
      res.status(200).send('ok!');
    }
  }
}
module.exports = new ApiControler();
