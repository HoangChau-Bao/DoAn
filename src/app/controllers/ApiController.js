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

      var cart = [];
      res.clearCookie('cartItemList');
      res.status(200).send('ok!');
    }
  }
}
module.exports = new ApiControler();
