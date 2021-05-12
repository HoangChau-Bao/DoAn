const config = require('../../config/db/dbconfig');
const sql = require('mssql');
var Handlebars = require('handlebars');
var NumeralHelper = require('handlebars.numeral');
NumeralHelper.registerHelpers(Handlebars);
Handlebars.registerHelper('dateFormat', require('handlebars-dateformat'));

class ProductsController {
  //[GET] /products/:slug
  showdetail(req, res, next) {
    sql.connect(config, (err, result) => {
      let str =
        "SELECT TOP(1) * FROM DienThoai WHERE slug = '" +
        req.params.slug +
        "' ;";
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
            //console.log(result.recordset);
            res.render('product/showdetail', { product: result.recordset });
            //res.send(result.recordset);
          }
        });
      }
    });
  }
}
module.exports = new ProductsController();
