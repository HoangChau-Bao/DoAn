const newsRouter = require('./news');
const siteRouter = require('./site');
const vouchersRoute = require('./vouchers');

function route(app) {
  app.use('/news', newsRouter);
  app.use('/vouchers', vouchersRoute);
  app.use('/', siteRouter);
}

module.exports = route;
