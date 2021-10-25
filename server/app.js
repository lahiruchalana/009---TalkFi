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


const recorder = require('node-record-lpcm16');////////////////////////// new added ///////////////////////////////////
const speech = require('@google-cloud/speech');////////////////////////// new added ///////////////////////////////////



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

    ////////////////////////// new added ///////////////////////////////////
    const client = new speech.SpeechClient();
    const encoding = 'LINEAR16';
    const sampleRateHertz = 16000;
    const languageCode = 'en-US';
    
    const request = {
      config: {
        encoding: encoding,
        sampleRateHertz: sampleRateHertz,
        languageCode: languageCode,
      },
      interimResults: false,
    };
    
    // Create a recognize stream
    const recognizeStream = client
      .streamingRecognize(request)
      .on('error', console.error)
      .on('data', data => { 
        function getText() {
          if(data.results[0] && data.results[0].alternatives[0]) {
            console.log(`Transcription: ${data.results[0].alternatives[0].transcript}\n`)
            io.on('connection', client => {
              setInterval(() => {
                client.emit('cpu', {
                  Id: tick++,
                  value: `${data.results[0].alternatives[0].transcript}`
                });
              }, 5000);
            });







            // can i use this method ////////////////////////////////////
            io.on('connection', client => {
              setInterval(() => {
                client.emit('name', {
                  Id: tick++,
                  value: `${data.results[0].alternatives[0].transcript}`
                });
              }, 5000);
            });
            io.on('connection', client => {
              setInterval(() => {
                client.emit('address', {
                  Id: tick++,
                  value: `${data.results[0].alternatives[0].transcript}`
                });
              }, 5000);
            });







            // res.json(`${data.results[0].alternatives[0].transcript}`)
            // res.json(`testing`)
          } else {
            console.log('\n\nReached transcription time limit, press Ctrl+C\n')
          }
        }
        getText()
      }
      );
    
    // Start recording and send the microphone input to the Speech API.
    recorder
      .record({
        sampleRateHertz: sampleRateHertz,
        threshold: 0,
        verbose: false,
        recordProgram: 'rec', 
        silence: '10.0',
      })
      .stream()
      .on('error', console.error)
      .pipe(recognizeStream);
    
    console.log('Listening, press Ctrl+C to stop.');

    // console.log(recorder.data)
    // res.json({speechToTextValue})

  ////////////////////////// new added ///////////////////////////////////

    // 2. every second, emit a 'cpu' event to user
    // os.cpuUsage(cpuPercent => {
    //   client.emit('cpu', {
    //     name: tick++,
    //     value: cpuPercent
    //   });
    // });

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
