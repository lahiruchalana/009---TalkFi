import React, { useState, useEffect } from 'react';
import axios from "../axios"
import requests from "../api/index"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import './main.css'

const client = new WebSocket('ws://localhost:9000');

const main = () => {
    let [textYourMessage, setTextYourMessage] = useState([]);
    let [textYourName, setTextYourName] = useState([]);
    let [textYourAddress, setTextYourAddress] = useState([]);
    let [textYourDesignation, setTextYourDesignation] = useState([]);
    let [question, setQuestion] = useState(0)
    let [newText, setNewText] = useState([]);
    
    async function fetchData(queqstionValue, newText) {
        if (queqstionValue == 0) {
            setTextYourMessage("You can answer using voice recoder by clicking start");
            setTextYourName("You can answer using voice recoder by clicking start");
            setTextYourAddress("You can answer using voice recoder by clicking start");
            setTextYourDesignation("You can answer using voice recoder by clicking start");
        } else if (queqstionValue == 1) {
            setTextYourMessage(newText);
            console.log("its working textYourMessage")
        } else if (queqstionValue == 2) {
            setTextYourName(newText);
            console.log("its working textYourName")             
        } else if (queqstionValue == 3) {
            setTextYourAddress(newText);
            console.log("its working textYourAddress")             
        } else if (queqstionValue == 4) {
            setTextYourDesignation(newText);
            console.log("its working textYourDesignation")             
        } else {
            console.log("invalid question value")
        }
    }
    
    useEffect(() => {           
        client.onopen = () => {
            // client.send('hello server, i am client')
        }
        client.onmessage = (event) => {
            console.log(event.data)
            setNewText(event.data)
        };
        
        fetchData(question, newText);
    }, [question, newText]);

    return ( 
        <div>
            <div class="container">
                <h1><strong>TalkingFill...............................</strong></h1>
                <div class="btn-group">
                    <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Language
                    </button>
                    <div class="dropdown-menu">
                        <a class="dropdown-item" href="#">සිංහල</a>
                        <a class="dropdown-item" href="#">English</a>
                        <a class="dropdown-item" href="#">தமிழ்</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="#">Separated link</a>
                    </div>
                </div>
                <Form> 
                    <div class="questionarea">
                        <h4>Your Message?</h4>
                        <Form.Control  id="note-textarea" placeholder={textYourMessage} rows="6"></Form.Control>
                        <Button onClick={() => {setQuestion(1)}} id="start-record-btn" title="Start Recording" type="button" variant="outline-success">Start</Button>
                        <Button id="save-note-btn" title="Save Note" type="button" variant="outline-info">Save</Button>
                    </div>
                    
                    <div class="questionarea">
                        <h4>Your Name?</h4>
                        <Form.Control  id="note-textarea" placeholder={textYourName} rows="6"></Form.Control>
                        <Button onClick={() => {setQuestion(2)}} id="start-record-btn" title="Start Recording" type="button" variant="outline-success">Start</Button>
                        <Button id="save-note-btn" title="Save Note" type="button" variant="outline-info">Save</Button>
                    </div>

                    <div class="questionarea">
                        <h4>Your Address?</h4>
                        <Form.Control  id="note-textarea" placeholder={textYourAddress} rows="6"></Form.Control>
                        <Button onClick={() => {setQuestion(3)}} id="start-record-btn" title="Start Recording" type="button" variant="outline-success">Start</Button>
                        <Button id="save-note-btn" title="Save Note" type="button" variant="outline-info">Save</Button>
                    </div>
                    
                    <div class="questionarea">
                        <h4>Your Designation?</h4>
                        <Form.Control  id="note-textarea" placeholder={textYourDesignation} rows="6"></Form.Control>
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


