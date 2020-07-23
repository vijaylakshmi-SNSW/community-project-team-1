import React, { useState } from "react";

export default function ProjectsSubmitRegistry(props) {

    const [givenName, setGivenName] = useState("");
    const [surname, setSurname] = useState("");
    const [postcode, setPostcode] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [projectSubmittReceived, setProjectSubmittReceived] = useState(false);
    const [projectSubmittNotReceived, setProjectSubmittNotReceived] = useState(false);

    const handleSubmitButton = e => {
        e.preventDefault();

        let project = {
            givenName: givenName,
            surname: surname,
            postcode: postcode,
            title: title,
            description: description
        }

        fetch('http://localhost:4000/api/projects/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project),
        })
            .then(response => response.json())
            .then(json => {
                if (json.status === 200) {
                    props.submitProject(json.project);
                    setGivenName("");
                    setSurname("");
                    setPostcode("");
                    setTitle("");
                    setDescription("");
                    setProjectSubmittReceived(true);
                } else {
                    setProjectSubmittNotReceived(true);
                }
            });
    }

    return (
        <div>
            <form className="projects-submit-registry-form">
                <label>Given Name/s:</label>
                <input placeholder="Enter Given Name here" onChange={e => setGivenName(e.target.value)} value={givenName} required></input>
                <label>Surname:</label>
                <input placeholder="Enter Surname here" onChange={e => setSurname(e.target.value)} value={surname}></input>
                <label>Postcode:</label>
                <input placeholder="Enter Postcode here" onChange={e => setPostcode(e.target.value)} value={postcode}></input>
                <label>Title of Project:</label>
                <input placeholder="Enter Title here" onChange={e=>setTitle(e.target.value)} value={title}></input>
                <label>Description of Project:</label>
                <input placeholder="Enter Description here" onChange={e => setDescription(e.target.value)} value={description}></input>
                <button onClick={handleSubmitButton}>Submit</button>
                <div>{projectSubmittReceived && (<p>Thank you very much for your submission!</p>)} {projectSubmittNotReceived && (<p>Please try again later.</p>)}</div>
            </form>
        </div>
    );
}