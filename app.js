var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var credentials = require('./app/config/credentials.js');
var sessionStore = new MySQLStore(credentials.db);
var db = require('./app/config/db')
var handlebars = require('express-handlebars').create({
       defaultLayout:'main',
       layoutsDir: path.join(__dirname, 'app', 'views', 'layouts')
})

db.connect(function(err) {
  if (err) {
    console.log('Unable to connect to MySQL.')
    process.exit(1)
  }
})

var routes = require('./app/routes/index');


var app = express();

app.use(session
  ({
  key: 'key',
  secret: 'secret',
  store: sessionStore,
  //Esto hace que se guarde solito en la base de datos.
  resave: true,
  saveUninitialized: false,
  cookie: {
    maxAge: 300000
  },
})
);

// view engine setup
app.set('views', path.join(__dirname, 'app', 'views'));
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('cookie-parser')(credentials.cookieSecret));
app.use(require('body-parser')());

app.use('/', routes);

// app.get('/',function(req,res){
//   res.render('index');
// });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
// if (app.get('env') === 'development') {
//   app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//       message: err.message,
//       error: err
//     });
//   });
// }
//
// // production error handler
// // no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//   res.status(err.status || 500);
//   res.render('500', {
//     message: err.message,
//     error: {}
//   });
// });


module.exports = app;
