const { mutipleMongooseToObject } = require('../../util/mongoose');
const Voucher = require('../models/Voucher');

class SiteController {
  //[GET] /#home
  index(req, res, next) {
    Voucher.find({})
      .then((vouchers) =>
        res.render('home', { vouchers: mutipleMongooseToObject(vouchers) }),
      )
      .catch(next);
  }
}
module.exports = new SiteController();
