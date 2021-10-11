// use this in ""Windows PowerShell"""  --> ////////////////////////
//            $env:GOOGLE_APPLICATION_CREDENTIALS="c:\Users\Lahiru\Downloads\speech-to-text-328105-ee0c673f9292 (2).json"

//            $env:GOOGLE_APPLICATION_CREDENTIALS="c:\Users\Lahiru\Downloads\voice-recognition-328210-a7721f2cbb07.json"

//            $env:GOOGLE_APPLICATION_CREDENTIALS="file path of json file of google API credentials"
// it is working ////////////////////////////

// Imports the Google Cloud client library
const fs = require('fs');
const speech = require('@google-cloud/speech');

// Creates a client
const client = new speech.SpeechClient();

const filename = './resources/audio3.raw';
const encoding = 'LINEAR16';
const sampleRateHertz = 16000;
const languageCode = 'en-US';

const config = {
  encoding: encoding,
  sampleRateHertz: sampleRateHertz,
  languageCode: languageCode,
};
const audio = {
  content: fs.readFileSync(filename).toString('base64'),
};

const request = {
  config: config,
  audio: audio,
};

async function main() {
    const [operation] = await client.longRunningRecognize(request);
    const [response] = await operation.promise();
    const transcription = response.results
      .map(result => result.alternatives[0].transcript)
      .join('\n');
    console.log(`Transcription: ${transcription}`);
}
  
main()








