import React, { useState } from "react";

export default function Projects({ projects }) {

    const [updateVoteCount, setUpdateVoteCount] = useState(0);
    const [showVoteButton, setShowVoteButton] = useState(true);

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
        <div>
            <ul >
                {projects.map(p =>
                    <li key={p.id} style={{ listStyle: "none" }}>
                        <div style={{ padding: "5px", margin: "5px", border: "1px solid grey" }} key={p.id}>
                            <p><strong>{p.title}</strong></p>
                            <p>{p.description}</p>
                            <div style={{ align: "right" }}>
                                <button className="vote-button" style={{ display: showVoteButton ? 'inline' : 'none' }} onClick={(e) => handleVoteClick(p.id, e)}>Vote for this project</button>
                            </div>
                        </div>
                    </li>
                )}
            </ul>
            {updateVoteCount > 0 && alert("Thanks for your vote")}
        </div>
    );
}