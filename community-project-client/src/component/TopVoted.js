import React, { useEffect, useState } from "react";

export default function TopVoted() {

    const [projects, setProjects] = useState([]);

    useEffect(() => {

        fetch("http://localhost:4000/api/projects/approved")
            .then(res => res.json())
            .then(projects => setProjects(projects.data));
    }, []);

    return (
        <div className="top-voted-container">
            <div className="top-voted-title">
                <h1>Popular Projects</h1>
            </div>
            <div className="top-voted-projects-list">
                {projects.sort((p1, p2) => p2.voteCount - p1.voteCount).map(p =>
                    <ul> {console.log(p)}
                        <li style={{ listStyle:"none", padding:"5px", border:"black solid 1px" }}>
                            <p>Title: {p.title}</p>
                            <p style={{ height:"150px" }}>Description: {p.description}</p>
                            <p>Votes: {p.voteCount}</p>
                            <p style={{ fontSize:"14px", textAlign:"end" }}>{p.submissionDate}</p>
                        </li>
                    </ul>
                )}
            </div>
        </div>
    );
}
