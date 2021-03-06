const newsRouter = require('./news');
const siteRouter = require('./site');
const productsRouter = require('./products');
const userRouter = require('./user');
const adminRouter = require('./admin');

function route(app) {
  app.use('/user', userRouter);
  app.use('/admin', adminRouter);
  app.use('/products', productsRouter);
  app.use('/news', newsRouter);
  app.use('/', siteRouter);
}

module.exports = route;
