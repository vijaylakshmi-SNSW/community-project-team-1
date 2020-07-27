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
                if (postcode === ("")) {
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
                if (postcode.charAt(0) === !(2) && postcodeEmpty === false) {
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
                if (setGivenNameEmpty() === false && setlastNameEmpty() === false && setPostcodeEmpty() === false && setTitleEmpty() === false && setDescriptionEmpty() === false && setPostcodeDoesNotStartWith2() === false && json.status !== 200) {
                    setProjectSubmittNotReceived(true);
                    setProjectSubmittReceived(false);
                }
            });
    }

    return (
        <div>
            <form className="projects-submit-registry-form">
                <label><h1>Submit a Project</h1></label>
                <label>* Given Name/s</label>
                <input className="project-submit-input" placeholder="Enter Given Name here" maxLength="50" onChange={e => setGivenName(e.target.value)} value={givenName}></input>
                <div>{givenNameEmpty && (<p style={{color: "red"}}><b>Given name/s required</b></p>)}</div>
                <label>* Surname</label>
                <input className="project-submit-input" placeholder="Enter Surname here" maxLength="50" onChange={e => setLastName(e.target.value)} value={lastName}></input>
                <div>{lastNameEmpty && (<p style={{color: "red"}}><b>Surname name required</b></p>)}</div>
                <label>* Postcode</label>
                <input className="project-submit-input" placeholder="Enter Postcode here" maxLength="4" onChange={e => setPostcode(e.target.value)} value={postcode}></input>
                <div>{postcodeEmpty && (<p style={{color: "red"}}><b>Postcode required</b></p>)}</div>
                <div>{postcodeDoesNotStartWith2 && (<p style={{color: "red"}}>Postcode starting with the number "2" required</p>)}</div>
                <label>* Title of Project</label>
                <input className="project-submit-input" placeholder="Enter Title here" onChange={e => setTitle(e.target.value)} value={title}></input>
                <div>{titleEmpty && (<p style={{color: "red"}}><b>Title required</b></p>)}</div>
                <label>* Description of Project</label>
                <textarea className="project-submit-input-description" maxLength='500' placeholder="Enter Description here (max 500 characters)" onChange={e => setDescription(e.target.value)} value={description}></textarea>
                <div>{descriptionEmpty && (<p style={{color: "red"}}><b>Description required</b></p>)}</div>
                <button  className="project-submit-button" onClick={handleSubmitButton}>Submit Project</button>
                <div>{projectSubmittReceived && (<p>Thank you very much for your submission!</p>)} {projectSubmittNotReceived && (<p>Please try again later</p>)}</div>
            </form>
        </div>
    );
}