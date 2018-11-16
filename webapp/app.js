var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var expressHbs = require('express-handlebars');
var hbs = require('handlebars');
var expressValidator = require('express-validator');
var expressSession = require('express-session');

var cases = require('./routes/cases');
var dashboard = require('./routes/dashboard');
var devices = require('./routes/devices');
var geoview = require('./routes/geoview');
//var login = require('./routes/login');

//var users = require('./routes/users');


var app = express();



hbs.registerHelper('equal', function(lvalue, rvalue, options) {
    if (arguments.length < 3)
        throw new Error("Handlebars Helper equal needs 2 parameters");
    if( lvalue!=rvalue ) {
        return options.inverse(this);
    } else {
        return options.fn(this);
    }
});

// this uri is for connect mongo atlas account
/*var uri = 'mongodb://breathalyzer:12345@' +
  'breathalyzer-shard-00-00-ureo4.mongodb.net:27017,' +
  'breathalyzer-shard-00-01-ureo4.mongodb.net:27017,' +
  'breathalyzer-shard-00-03-ureo4.mongodb.net:27017/breathalyzer_db?' +
  'ssl=true&replicaSet=breathalyzer-shard-0&authSource=admin';*/

// this is for connect to malab mongodb deployment
var uri = 'mongodb://admin:12345@ds257848.mlab.com:57848/breathalyzer_db';
//localhost
//var uri = 'mongodb://localhost/breathalyzer_db';
mongoose.connect(uri);

// view engine setup
app.engine('.hbs', expressHbs(
  {
    defaultLayout:'layout',
    extname:'.hbs',
    helpers: require('./Helpers/helpers.js')(hbs)
  }));
app.set('view engine', '.hbs');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// session
app.use(expressSession({
  secret: 'max',
  resave: false,
  saveUninitialized: false
}));
app.use(expressValidator());

app.use('/cases', cases);
app.use('/', dashboard);
//app.use('/', login);
app.use('/devices', devices);
app.use('/geo_analysis', geoview);

//app.use('/users', users);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
