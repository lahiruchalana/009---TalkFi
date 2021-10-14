import React, { useState, useEffect } from 'react';
import axios from "../axios"
import requests from "../api/index"

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import './main.css'

const main = () => {
    let [text, setText] = useState([]);
    
    useEffect(() => {           
        async function fetchData() {
            const request = await axios.get(requests.fetchAudioStreamToText);
            console.log(request.data);
            setText(request.data);
            return request.data; 
        }

        fetchData();
        
    
    }, [requests.fetchAudioStreamToText]);

    return ( 
        <div>
            <div class="container">
                <h1><strong>TalkingFill............</strong></h1>
                <Form> 
                    <div class="questionarea">
                        <h4>Your Message?</h4>
                        <Form.Control  id="note-textarea" placeholder="You can answer by typing or using voice recognition." rows="6"></Form.Control>
                        <h2>{text}</h2>
                        <Button onClick={() => {setTextArea(1)}} id="start-record-btn" title="Start Recording" type="button" variant="outline-success">Start</Button>
                        <Button id="save-note-btn" title="Save Note" type="button" variant="outline-info">Save</Button>
                    </div>
                    
                    <div class="questionarea">
                        <h4>Your Name?</h4>
                        <Form.Control  id="note-textarea" placeholder="You can answer by typing or using voice recognition." rows="6"></Form.Control>
                        <Button onClick={() => {setTextArea(2)}} id="start-record-btn" title="Start Recording" type="button" variant="outline-success">Start</Button>
                        <Button id="save-note-btn" title="Save Note" type="button" variant="outline-info">Save</Button>
                    </div>

                    <div class="questionarea">
                        <h4>Your Address?</h4>
                        <Form.Control  id="note-textarea" placeholder="You can answer by typing or using voice recognition." rows="6"></Form.Control>
                        <Button id="start-record-btn" title="Start Recording" type="button" variant="outline-success">Start</Button>
                        <Button id="save-note-btn" title="Save Note" type="button" variant="outline-info">Save</Button>
                    </div>
                    
                    <div class="questionarea">
                        <h4>Your Designation?</h4>
                        <Form.Control  id="note-textarea" placeholder="You can answer by typing or using voice recognition." rows="6"></Form.Control>
                        <Button id="start-record-btn" title="Start Recording" type="button" variant="outline-success">Start</Button>
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


