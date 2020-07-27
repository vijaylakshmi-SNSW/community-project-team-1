import React, { useState } from "react";
import Result from './Result';

export default function Admin() {
    const [status, setStatus] = useState('');
    
    const [result, setResult] = useState([]);

    


    function getUserRequest(e) {
debugger;
        //stop the form from submitting and making a synchronous post request
        e.preventDefault();
        //instead we are making an asynchronous request using fetch
        
        fetch(`http://localhost:4000/api/projects/${status}`, {
            headers: { 'Content-Type': 'application/json' },

        })
            .then((response) => response.json())
            .then(json => setResult(json.data));

    }

    

    return (
        <div >
           
            <label style={{'padding': '10px'}}>Please select a status to view projects:</label>
            
            <select style={{'padding': '10px'}} name='status' onChange={(e) => setStatus(e.target.value)}>
                <option value="">Select a status </option>
                <option value="approved">Approved</option>
                <option value="rejected">Declined</option>
                <option value="pending">Pending</option>
            </select>

            <button style={{'padding': '10px', 'margin': '10px '}} onClick={getUserRequest}>View Projects</button>
            
            <div>
                <br />
                <br />
      {result.map(c => <Result key={c.id} display={c} />)}
              
            <br />
        
            </div>


        </div>

    )
}