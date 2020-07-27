import React, { useState, useEffect } from "react";
import '../App.css';

// const [status, setStatus] = useState('');
//const [resultObj, setResultObj] = useState(undefined);

export default function Result(props) {
    const [answer, setAnswer] = useState(undefined);

    let result = props.display;

    function sendUserRequest(e, result) {
        // debugger;
        e.preventDefault();
        let status = e.target.value;
        let id = result.id;
        let s = { status, id }
        fetch("http://localhost:4000/api/projects/status/update", {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(s)
        })
            .then((response) => response.json())
            .then(json => setAnswer(json.data))

    }
    useEffect(() => {

        fetch('/api/projects')
          .then(response => response.json())
          .then(data => setAnswer(data));
      }, []);
    




    return (
        <div style={{ 'border': '2px', 'borderStyle': 'groove' }}>
            <br />
       <strong>Name:</strong>  {result.givenName}  {result.lastName}
            <br />
        <strong>Title:</strong> {result.title}
            <br />
        <strong>Description:</strong>{result.description}
            <br />
         <strong>Status:</strong>{result.status}

            {
                (result.status === 'pending' &&

                    <div>
                        <br />
                        <button class="approve-button" onClick={(event) => sendUserRequest(event, result)} value="approved">Approve</button>


                        <button class="reject-button" onClick={(event) => sendUserRequest(event, result)} value="rejected">Reject</button>
                        <br />
                    </div>
                )

            }

            <div>

                {answer && <p>The project has been {answer.value.status}</p>}

            </div>
            <br />
            <br />
        </div>
    )
}
