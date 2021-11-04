var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var Cors = require('cors');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var audioStreamToTextRouter = require('./routes/audioStreamToText');
// const server = require('http').createServer();////////////////////////// new added ///////////////////////////////////
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
const ws = require('ws');
const server = new ws.Server({
  port: 9000
})
// const io = require('socket.io')(server, {
//   transports: ['websocket', 'polling']
// });

// server.listen(9000, () => {
//   console.log('Started in 9000');
// });

///////////////////////////////////////////////////////////////////////////////////
// let tick = 0;
// 1. listen for socket connections

    ////////////////////////// new added ///////////////////////////////////
    const client = new speech.SpeechClient();
    const encoding = 'LINEAR16';
    const sampleRateHertz = 16000;
    const languageCode = 'en-US';

    var arrayOfTextSpeech = [];
    
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
            arrayOfTextSpeech.push(`${data.results[0].alternatives[0].transcript}`);
            console.log(arrayOfTextSpeech.join(""))
            server.on('connection', (client) => {
              client.on('message', (data) => {
                console.log('received', data)
              })
              client.send(`${arrayOfTextSpeech.join("")}`);
            });
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
        silence: '0.0',
      })
      .stream()
      .on('error', console.error)
      .pipe(recognizeStream);
    
    console.log('Listening, press Ctrl+C to stop.');

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/audioStreamToText', audioStreamToTextRouter)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
