import React, { useState, useEffect } from "react";
import '../App.css';

export default function Result(props) {
    
    const [updatedProject, setUpdatedProject] = useState();

    function setUpdateProjectStatusRequest(e) {
        e.preventDefault();
        fetch("http://localhost:4000/api/projects/status/update", {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({status: e.target.value,id:props.project.id})
        })
            .then((response) => response.json())
            .then(json => {
                setUpdatedProject(json.data);
                props.updateMessage.setShowUpdateMessage(true); 
            })
    }
    
    return (
        <div style={{border:'2px',borderStyle:'groove',padding:'10px',margin:'3.5px'}}>
            <div>
            {
                props.updateMessage.showUpdateMessage && updatedProject && 
                <p style={{textAlign:'center',padding:'10px',backgroundColor:updatedProject.value.status == 'approved' ? '#b3ffb3' : '#ffb3b3',color:'#003300'}}>
                    The project has been {updatedProject.value.status}
                </p>
            }
            </div>
            <strong>Name: </strong>{props.project.givenName}  {props.project.lastName}
            <br />
            <strong>Title: </strong>{props.project.title}
            <br />
            <strong>Description: </strong>{props.project.description}
            <br />
            <strong>Status: </strong>{updatedProject ? updatedProject.value.status : props.project.status}
            {
                (props.project.status === 'pending' && !updatedProject  &&
                    <div>
                        <br />
                        <button className="approve-button" onClick={setUpdateProjectStatusRequest} value="approved">Approve</button>
                        <button className="reject-button" onClick={setUpdateProjectStatusRequest} value="rejected">Reject</button>
                        <br />
                    </div>
                )
            }
        </div>
    )
}
