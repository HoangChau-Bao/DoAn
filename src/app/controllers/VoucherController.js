const { mongooseToObject } = require('../../util/mongoose');
const Voucher = require('../models/Voucher');

class VoucherController {
  //[GET] /vouchers/:slug
  show(req, res, next) {
    Voucher.findOne({ slug: req.params.slug })
      .then((voucher) => {
        res.render('vouchers/show', { voucher: mongooseToObject(voucher) });
      })
      .catch(next);
  }

  //[GET] /vouchers/addvoucher
  add(req, res) {
    res.render('vouchers/addvoucher');
  }

  // [POST] /vouchers/store
  store(req, res, next) {
    const formData = req.body;
    //formData.voucherId = req.body.voucherId;
    formData.name = req.body.name;
    formData.slug = req.body.name;

    const voucher = new Voucher(formData);

    voucher
      .save()
      .then(() => res.redirect('/'))
      .catch((error) => {});
  }
}

module.exports = new VoucherController();
