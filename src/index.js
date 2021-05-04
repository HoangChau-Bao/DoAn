const express = require('express');
const morgan = require('morgan');
const path = require('path');
const handlebars = require('express-handlebars');
const app = express();
const port = 3000;

//const routes
const route = require('./routes');

//Mongoose
const db = require('./config/db');

//Connect to db
db.connect();

//Http logger
app.use(morgan('combined'));

//scss
app.use(express.static(path.join(__dirname, 'public')));

//middleware
app.use(
  express.urlencoded({
    extended: true, //body parser được tích học từ express 4.16
  }),
);

//Template engine
app.engine(
  'hbs',
  handlebars({
    extname: '.hbs',
    //partialsDir: path.join(__dirname, 'views/partials'),
  }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// app.get('/', (req,res) => {
//     res.render('home');
// })

route(app);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
