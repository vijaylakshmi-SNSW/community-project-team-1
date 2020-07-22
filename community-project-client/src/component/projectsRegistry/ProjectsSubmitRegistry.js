import React, { useState, useEffect } from "react";

export default function ProjectsSubmitRegistry(props) {

    const [givenName, setGivenName] = useState("");
    const [surname, setSurname] = useState("");
    const [postcode, setPostcode] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmitButton = e => {
        e.preventDefault();

        let project = {
            givenName = givenName,
            surname = surname,
            postcode = postcode,
            description = description
        }

        fetch('http://localhost:3000/api/projects/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project),
        })
            .then(response => response.json())
            .then(json => {
                props.submitProject(json.project);
            });
    }

    return (
        <div>
            <form>
                <label>Given Name/s:</label>
                <input placeholder="Enter Given Name here" onChange={e => setGivenName(e.target.value)}></input>
                <label>Surname:</label>
                <input placeholder="Enter Surname here" onChange={e => setSurname(e.target.value)}></input>
                <label>Postcode:</label>
                <input placeholder="Enter Postcode here" onChange={e => setPostcode(e.target.value)}></input>
                <label>Description of Project:</label>
                <input placeholder="Enter Description here" onChange={e => setDescription(e.target.value)}></input>
                <button onClick={handleSubmitButton}>Submit</button>
            </form>
        </div>
    );
}