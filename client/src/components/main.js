import React, { useState, useEffect } from 'react';
import axios from "../axios"
import requests from "../api/index"

const main = () => {
    const [text, setText] = useState([]);

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
                <div class="app"> 
                    <div class="questionarea">
                        <h4>Your Message?</h4>
                        <h2>{text}</h2>
                        <div class="input-single">
                            <textarea id="note-textarea" placeholder="You can answer by typing or using voice recognition." rows="6"></textarea>
                        </div>         
                        <button id="start-record-btn" title="Start Recording" type="button" class="btn btn-success">Start</button>
                        <button id="pause-record-btn" title="Pause Recording" type="button" class="btn btn-warning">Pause</button>
                        <button id="save-note-btn" title="Save Note" type="button" class="btn btn-primary">Save</button>
                        <button id="clear-note-btn" title="Clear Note" type="button" class="btn btn-danger">Clear</button>
                    </div>
                    
                    <div class="questionarea">
                        <h4>Your Name?</h4>
                        <div class="input-single">
                            <textarea id="name-textarea" placeholder="You can answer by typing or using voice recognition." rows="6"></textarea>
                        </div>         
                        <button id="name-start-record-btn" title="Start Recording" type="button" class="btn btn-success">Start</button>
                        <button id="name-pause-record-btn" title="Pause Recording" type="button" class="btn btn-warning">Pause</button>
                        <button id="name-save-note-btn" title="Save Note" type="button" class="btn btn-primary">Save</button>
                        <button id="name-clear-note-btn" title="Clear Note" type="button" class="btn btn-danger">Clear</button>
                    </div>

                    <div class="questionarea">
                        <h4>Your Address?</h4>
                        <div class="input-single">
                            <textarea id="address-textarea" placeholder="You can answer by typing or using voice recognition." rows="6"></textarea>
                        </div>         
                        <button id="address-start-record-btn" title="Start Recording" type="button" class="btn btn-success">Start</button>
                        <button id="address-pause-record-btn" title="Pause Recording" type="button" class="btn btn-warning">Pause</button>
                        <button id="address-save-note-btn" title="Save Note" type="button" class="btn btn-primary">Save</button>
                        <button id="address-clear-note-btn" title="Clear Note" type="button" class="btn btn-danger">Clear</button>
                    </div>
                    
                    <div class="questionarea">
                        <h4>Your Designation?</h4>
                        <div class="input-single">
                            <textarea id="designation-textarea" placeholder="You can answer by typing or using voice recognition." rows="6"></textarea>
                        </div>         
                        <button id="designation-start-record-btn" title="Start Recording" type="button" class="btn btn-success">Start</button>
                        <button id="designation-pause-record-btn" title="Pause Recording" type="button" class="btn btn-warning">Pause</button>
                        <button id="designation-save-note-btn" title="Save Note" type="button" class="btn btn-primary">Save</button>
                        <button id="designation-clear-note-btn" title="Clear Note" type="button" class="btn btn-danger">Clear</button>
                    </div>

                    <p id="recording-instructions">Press the <strong>Start</strong> button and allow access to start record.</p>
                    
                    <div class="confirm-btns">
                        <button id="save-info-btn" title="Save Data" type="button" class="btn btn-success">Save Info</button>
                        <button id="clear-btn" title="Clear Data" type="button" class="btn btn-danger">Clear</button>
                    </div>

                    <h3>My Answers</h3>
                    <ul id="notes">
                        <li>
                            <p class="no-notes">You don't have any answers.</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

    );
}    

export default main;


