import React, { useState } from "react";

export default function ProjectsSubmitRegistry(props) {

    const [givenName, setGivenName] = useState("");
    const [lastName, setLastName] = useState("");
    const [postcode, setPostcode] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [givenNameEmpty, setGivenNameEmpty] = useState(false);
    const [lastNameEmpty, setlastNameEmpty] = useState(false);
    const [postcodeEmpty, setPostcodeEmpty] = useState(false);
    const [postcodeDoesNotStartWith2, setPostcodeDoesNotStartWith2] = useState(false);
    const [titleEmpty, setTitleEmpty] = useState(false);
    const [descriptionEmpty, setDescriptionEmpty] = useState(false);
    const [projectSubmittReceived, setProjectSubmittReceived] = useState(false);
    const [projectSubmittNotReceived, setProjectSubmittNotReceived] = useState(false);

    const handleSubmitButton = e => {
        e.preventDefault();

        let project = {
            givenName: givenName,
            lastName: lastName,
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
                if (givenName === ("")) {
                    setGivenNameEmpty(true);
                } else {
                    setGivenNameEmpty(false);
                }
                if (lastName === ("")) {
                    setlastNameEmpty(true);
                } else {
                    setlastNameEmpty(false);
                }
                if (postcode.length !== 4) {
                    setPostcodeEmpty(true);
                } else {
                    setPostcodeEmpty(false);
                }
                if (title === ("")) {
                    setTitleEmpty(true);
                } else {
                    setTitleEmpty(false);
                }
                if (description === ("")) {
                    setDescriptionEmpty(true);
                } else {
                    setDescriptionEmpty(false);
                }
                if (postcode.charAt(0) !== ("2")) {
                    setPostcodeDoesNotStartWith2(true);
                } else {
                    setPostcodeDoesNotStartWith2(false);
                }
                setProjectSubmittReceived(false);
                if (json.status === 200) {
                    props.submitProject(json.project);
                    setGivenName("");
                    setLastName("");
                    setPostcode("");
                    setTitle("");
                    setDescription("");
                    setProjectSubmittReceived(true);
                    setProjectSubmittNotReceived(false);
                } 
                if (json.status === 400) {
                    setProjectSubmittNotReceived(true);
                    setProjectSubmittReceived(false);
                }
            });
    }

    return (
        <div>
            <form className="projects-submit-registry-form">
                <label><h1>Submit a Project</h1></label>
                {projectSubmittReceived && (<p>Thank you very much for your submission!</p>)}
                <p style={{paddingBottom:"8px"}}>The * indicates a mandatory field</p>
                <label>* Given Name/s</label>
                <input className="project-submit-input" placeholder="Enter Given Name here" minLength="1" maxLength="50" onChange={e => setGivenName(e.target.value)} value={givenName}></input>
                <div className="error-messages">{givenNameEmpty && (<p style={{ color: "red" }}><b>Given name/s required</b></p>)}</div>
                <label>* Surname</label>
                <input className="project-submit-input" placeholder="Enter Surname here" minLength="1" maxLength="50" onChange={e => setLastName(e.target.value)} value={lastName}></input>
                <div className="error-messages">{lastNameEmpty && (<p style={{ color: "red" }}><b>Surname name required</b></p>)}</div>
                <label>* Postcode</label>
                <input className="project-submit-input" placeholder="Enter Postcode here" minLength="4" maxLength="4" onChange={e => setPostcode(e.target.value)} value={postcode}></input>
                <div className="error-messages">{postcodeEmpty && (<p style={{ color: "red" }}><b>Postcode requires 4 characters</b></p>)}</div>
                <div className="error-messages">{postcodeDoesNotStartWith2 && (<p style={{ color: "red" }}><b>Postcode starting with the number "2" required</b></p>)}</div>
                <label>* Title of Project</label>
                <input className="project-submit-input" placeholder="Enter Title here" minLength="1" maxLength="100" onChange={e => setTitle(e.target.value)} value={title}></input>
                <div className="error-messages">{titleEmpty && (<p style={{ color: "red" }}><b>Title required</b></p>)}</div>
                <label>* Description of Project</label>
                <textarea className="project-submit-input-description" maxLength='500' minLength="1" placeholder="Enter Description here (max 500 characters)" onChange={e => setDescription(e.target.value)} value={description}></textarea>
                <div className="error-messages">{descriptionEmpty && (<p style={{ color: "red" }}><b>Description required</b></p>)}</div>
                <button className="project-submit-button" onClick={handleSubmitButton}>Submit Project</button>
                <div className="error-messages"> {projectSubmittNotReceived && (<p>Please try again later</p>)}</div>
            </form>
        </div>
    );
}