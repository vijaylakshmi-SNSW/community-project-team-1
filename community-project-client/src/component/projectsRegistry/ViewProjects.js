import React, { useState, useEffect } from "react";

export default function ViewProjects() {


    const [projects, setProjects] = useState([]);

    useEffect(() => {
        
        fetch("http://localhost:4000/api/projects/approved")
            .then(res => res.json())
            .then(projects => setProjects(projects.data));
    }, []);

    function handleVoteClick() {
        return alert(`Thank you for your vote!`);
    }


    return (
        <div className="viewprojects-eligible">
            <div className="viewall-container">
                <div className="eligible-projects-image">
                    <img src="https://www.nsw.gov.au/sites/default/files/styles/content_x1/public/2020-02/My-Community-Project-Eligible-Projects-DataCard-Banner-v04.png?itok=TUeWyMMC"></img>
                </div>
            </div>
            <h1>Community Project</h1>
            <p>Browse the projects that have been approved for consideration.</p>
            <p>New project submissions are still being accepted. </p>

            {projects.map(p =>
                <div >
                        <div style={{ padding: "5px", margin: "5px", border: "1px solid grey" }}>
                            <p><strong>{p.title}</strong></p>
                            <p>{p.description}</p>
                            <div style={{align: "right"}}>
                                <button class="vote-button" onClick={handleVoteClick}>Vote for this project</button>
                            </div>
                        </div>
                </div>)}
        </div>
    );
}