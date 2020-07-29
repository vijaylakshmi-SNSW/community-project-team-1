import React, { useState, useEffect } from "react";

export default function ViewProjects() {


    const [projects, setProjects] = useState([]);
    const [updateVoteCount, setUpdateVoteCount] = useState(0);
    const [showVoteButton, setShowVoteButton] = useState(true);

    useEffect(() => {
        fetch("http://localhost:4000/api/projects/approved")
            .then(res => res.json())
            .then(projects => {
                setUpdateVoteCount(0) ;
                setProjects(projects.data)
            })
    }, []);


    function handleVoteClick(id, e) {
        
        e.preventDefault();
        setShowVoteButton(false);
        fetch("http://localhost:4000/api/projects/vote", {

            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: id })
        })
            .then((response) => response.json())
            .then(json => {
                setUpdateVoteCount(json.data.content.value.voteCount)
            })

    }

    return (
        <div className="viewprojects-eligible">
            <div className="viewall-container">
                <div className="eligible-projects-image">
                    <img src="https://www.nsw.gov.au/sites/default/files/styles/content_x1/public/2020-02/My-Community-Project-Eligible-Projects-DataCard-Banner-v04.png?itok=TUeWyMMC" alt="Community Project"></img>
                </div>
            </div>
            <h1>Community Project</h1>
            <p>Browse the projects that have been approved for consideration.</p>
            <p>New project submissions are still being accepted. </p>
            
            {projects.map(p =>
                <ul >
                    <li style={{ listStyle: "none" }}>
                        <div style={{ padding: "5px", margin: "5px", border: "1px solid grey" }} key={p.id}>
                            <p><strong>{p.title}</strong></p>
                            <p>{p.description}</p>
                            <div style={{ align: "right" }}>
                                <button className="vote-button" style={{ display: showVoteButton ? 'inline' : 'none' }} onClick={(e) => handleVoteClick(p.id, e)}>Vote for this project</button>
                               
                            </div>
                        </div>
                    </li>
                </ul>)}

                {updateVoteCount > 0 && alert ("Thanks for your vote")}


        </div>


    );
}
