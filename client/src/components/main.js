import React, { useState, useEffect } from 'react';
import axios from "../axios"
import requests from "../api/index"

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import './main.css'

const main = () => {
    let [textYourMessage, setTextYourMessage] = useState([]);
    let [textYourName, setTextYourName] = useState([]);
    let [question, setQuestion] = useState(0)
    
    async function fetchData(URI, queqstionValue) {
        if (queqstionValue == 0) {
            setTextYourMessage("start your speech");
            setTextYourName("start your speech");
        } else if (queqstionValue == 1) {
            const request = await axios.get(URI);
            console.log(request.data);
            setTextYourMessage(request.data);
            console.log("its working textYourMessage")
            return request.data;             
        } else if (queqstionValue == 2) {
            const request = await axios.get(URI);
            console.log(request.data);
            setTextYourName(request.data);
            console.log("its working textYourName")             
            return request.data;
        } else if (queqstionValue == 3) {
            const request = await axios.get(URI);
            console.log(request.data);
            setTextYourName(request.data);
            console.log("its working textYourName")             
            return request.data;
        } else if (queqstionValue == 4) {
            const request = await axios.get(URI);
            console.log(request.data);
            setTextYourName(request.data);
            console.log("its working textYourName")             
            return request.data;
        } else if (queqstionValue == 5) {
            const request = await axios.get(URI);
            console.log(request.data);
            setTextYourName(request.data);
            console.log("its working textYourName")             
            return request.data;
        } else {
            console.log("success")
        }
    }
    
    useEffect(() => {           
        fetchData(requests.fetchAudioStreamToText, question);
    }, [requests.fetchAudioStreamToText, question]);

    return ( 
        <div>
            <div class="container">
                <h1><strong>TalkingFill............</strong></h1>
                <Form> 
                    <div class="questionarea">
                        <h4>Your Message?</h4>
                        <Form.Control  id="note-textarea" placeholder="You can answer by typing or using voice recognition." rows="6"></Form.Control>
                        <h2>{textYourMessage}</h2>
                        <Button onClick={() => {setQuestion(1)}} id="start-record-btn" title="Start Recording" type="button" variant="outline-success">Start</Button>
                        <Button id="save-note-btn" title="Save Note" type="button" variant="outline-info">Save</Button>
                    </div>
                    
                    <div class="questionarea">
                        <h4>Your Name?</h4>
                        <Form.Control  id="note-textarea" placeholder="You can answer by typing or using voice recognition." rows="6"></Form.Control>
                        <h2>{textYourName}</h2>
                        <Button onClick={() => {setQuestion(2)}} id="start-record-btn" title="Start Recording" type="button" variant="outline-success">Start</Button>
                        <Button id="save-note-btn" title="Save Note" type="button" variant="outline-info">Save</Button>
                    </div>

                    <div class="questionarea">
                        <h4>Your Address?</h4>
                        <Form.Control  id="note-textarea" placeholder="You can answer by typing or using voice recognition." rows="6"></Form.Control>
                        <h2>{textYourAddress}</h2>
                        <Button onClick={() => {setQuestion(3)}} id="start-record-btn" title="Start Recording" type="button" variant="outline-success">Start</Button>
                        <Button id="save-note-btn" title="Save Note" type="button" variant="outline-info">Save</Button>
                    </div>
                    
                    <div class="questionarea">
                        <h4>Your Designation?</h4>
                        <Form.Control  id="note-textarea" placeholder="You can answer by typing or using voice recognition." rows="6"></Form.Control>
                        <h2>{textYourDesignation}</h2>
                        <Button onClick={() => {setQuestion(4)}} id="start-record-btn" title="Start Recording" type="button" variant="outline-success">Start</Button>
                        <Button id="save-note-btn" title="Save Note" type="button" variant="outline-info">Save</Button>
                    </div>

                    <p id="recording-instructions">Press the <strong>Start</strong> button and allow access to start record.</p>
                    
                    <div class="confirm-btns">
                        <button id="save-info-btn" title="Save Data" type="button" class="btn btn-success">Save Info</button>
                        <button id="clear-btn" title="Clear Data" type="button" class="btn btn-danger">Clear</button>
                    </div>
                </Form>
            </div>
        </div>

    );
}    

export default main;


