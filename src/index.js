const express = require('express');
const morgan = require('morgan');
const path = require('path');
const handlebars = require('express-handlebars');
const session = require('express-session');
const passport = require('passport');
const fileupload = require('express-fileupload');
const app = express();
const port = 3000;

//const routes
const route = require('./routes');

//session
app.use(
  session({
    secret: 'mysecret',
    cookie: {
      maxAge: 1000 * 60 * 30,
    },
  }),
);
//express-file upload
app.use(fileupload());

//passport
app.use(passport.initialize());
app.use(passport.session());

//dynamic header
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated();
  next();
});

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
