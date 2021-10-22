var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var Cors = require('cors');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var audioStreamToTextRouter = require('./routes/audioStreamToText');
const server = require('http').createServer();////////////////////////// new added ///////////////////////////////////
const os = require('os-utils');////////////////////////// new added ///////////////////////////////////

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(Cors());






////////////////////////// new added ///////////////////////////////////
const io = require('socket.io')(server, {
  transports: ['websocket', 'polling']
});

server.listen(9000, () => {
  console.log('Started in 9000');
});

///////////////////////////////////////////////////////////////////////////////////
let tick = 0;
// 1. listen for socket connections
io.on('connection', client => {
  setInterval(() => {
    // 2. every second, emit a 'cpu' event to user
    os.cpuUsage(cpuPercent => {
      client.emit('cpu', {
        name: tick++,
        value: cpuPercent
      });
    });
  }, 1000);
});
///////////////////////////////////////////////////////////////////////////////////


////////////////////////// new added ///////////////////////////////////





app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/audioStreamToText', audioStreamToTextRouter)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
