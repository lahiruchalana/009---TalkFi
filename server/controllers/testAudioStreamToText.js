const recorder = require('node-record-lpcm16');
const speech = require('@google-cloud/speech');

exports.getTextOfSpeech = async(req, res) => {
  try {

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
            res.json(`${data.results[0].alternatives[0].transcript}`)
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


  } catch (err) {
    return res.status(500).json({msg: err.message})
  }
}