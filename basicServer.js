var express = require('express');
var ejs = require('ejs');
var path = require('path');

var morgan = require('morgan');
var bunyan = require('bunyan');

var app = express();

var log = bunyan.createLogger({
  name: 'basicExpress',
  serializers: {
    req: bunyan.stdSerializers.req,
    res: bunyan.stdSerializers.res
  }
});

var PORT = process.env.PORT || 9900;

log.info({}, 'log started');

log.info({port: PORT}, 'server port');
log.info({dirname: __dirname}, '__dirname');

// set up path to web pages
app.set('views', path.join(__dirname, 'views'));

// set express to use ejs templates (with that extension)
//app.set('view engine', 'ejs');

// set express to use jade templates (with that extension)
app.set('view engine', 'jade');

// set express to use ejs templates (with html extension)
//app.engine('html', ejs.renderFile);
//app.set('view engine', 'html');

app.use(morgan('dev'));
//app.use(morgan('combined'));

// specify location of static resources
app.use(express.static('resources'));

app.get('/', function (req, res) {
  log.info({req: req}, '/');
  res.render('home');
  log.info({res: res}, 'home rendered');
});

app.get('/noRender', function (req, res) {

  log.info({req: req}, '/');
  log.info({views: app.get('views')}, 'views folder');

  //res.sendFile(__dirname + '/views/home.html');
  res.sendFile(app.get('views') + '/' + 'home.html');
  log.info({res: res}, 'home.html rendered');
});

app.listen(PORT);
