import React, { useState } from "react";
import Result from './Result';

export default function Admin() {
    const [projects, setProjects] = useState([]);
    const [showUpdateMessage,setShowUpdateMessage] = useState(false); 

    function getProjectsByStatus(e) {

        if(e.target.value !== ""){
             //stop the form from submitting and making a synchronous post request
            e.preventDefault();
            //instead we are making an asynchronous request using fetch        
            fetch(`http://localhost:4000/api/projects/${e.target.value}`, {headers: { 'Content-Type': 'application/json' }})
                .then((response) => response.json())
                .then(json => {
                    setProjects(json.data);
                    setShowUpdateMessage(false); 
                });
        }
    }

    return (
        <div >         
            <label style={{'padding': '10px'}}>Please select a status to view projects:</label>           
            <select style={{'padding': '10px'}} name='status' onChange={getProjectsByStatus}>
                <option value="">Select a status </option>
                <option value="approved">Approved</option>
                <option value="rejected">Declined</option>
                <option value="pending">Pending</option>
            </select>    
            <div>
                <br />
                <br />
                {projects.map(p => <Result key={p.id} project={p} updateMessage={{showUpdateMessage,setShowUpdateMessage}} />)}             
                <br />
            </div>
        </div>
    )
}