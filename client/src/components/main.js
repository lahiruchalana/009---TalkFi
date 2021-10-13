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
            <h1>{text}</h1>
            <button>Hello</button>
        </div>
    );
}    

export default main;


