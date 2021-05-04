
const mongoose = require('mongoose');

async function connect() {
    try {
      await mongoose.connect('mongodb://localhost:27017/Traveloka_Voucher', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Connect Succesfully!!!');
    } catch (error) {
      console.log('Connect Fail !!!');
    }
}

module.exports = { connect };
