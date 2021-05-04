const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Voucher = new Schema(
  {
    voucherId: { type: Number },
    catalogId: { type: Number },
    name: { type: String },
    content: { type: String },
    pointCost: { type: Number },
    discount: { type: Number },
    quantity: { type: Number },
    Code: { type: String },
    partnerId: { type: String },
    imageLink: { type: String },
    preContent: { type: String },
    slug: { type: String, slug: 'name', unique: true },
    contentHeader: { type: String },
    voucherNote: { type: String },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Voucher', Voucher);
