const express = require('express');
const morgan = require('morgan');
const path = require('path');
const handlebars = require('express-handlebars');
const session = require('express-session');
const passport = require('passport');
const app = express();
const port = 3000;

//const routes
const route = require('./routes');

//session
app.use(
  session({
    secret: 'mysecret',
    cookie: {
      maxAge: 1000 * 30,
    },
  }),
);

//passport
app.use(passport.initialize());
app.use(passport.session());

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

route(app);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
