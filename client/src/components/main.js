import React from 'react';

// import music from './../../resources/audio.raw'

// import fs from 'fs';
// import speech from '@google-cloud/speech';


const main = () => {


    // // Creates a client
    // const client = new speech.SpeechClient();

    // const filename = './resources/audio3.raw';
    // const encoding = 'LINEAR16';
    // const sampleRateHertz = 16000;
    // const languageCode = 'en-US';

    // const config = {
    // encoding: encoding,
    // sampleRateHertz: sampleRateHertz,
    // languageCode: languageCode,
    // };
    // const audio = {
    // content: fs.readFileSync(filename).toString('base64'),
    // };

    // const request = {
    // config: config,
    // audio: audio,
    // };

    // async function handling() {
    //     const [operation] = await client.longRunningRecognize(request);
    //     const [response] = await operation.promise();
    //     const transcription = response.results
    //     .map(result => result.alternatives[0].transcript)
    //     .join('\n');
    //     console.log(`Transcription: ${transcription}`);
    // }
    
    // handling()

    return ( 
        <div>
            <button>Hello</button>
        </div>
    );
}    

export default main;


