import React from "react";

export default function TopVotedProjects({ projects, loading }) {

    if (loading)
        return <h2>Loading...</h2>;
    return (
        <div className="top-voted-projects-list">
            {projects.map(p =>
                <ul key={p.id}>
                    <li key={p.id} style={{ listStyle: "none", padding: "5px", border: "black solid 1px" }}>
                        <p><strong>{p.title}</strong></p>
                        <p style={{ height: "50px" }}>{p.description}</p>
                        <p><strong>Votes: </strong>{p.voteCount}</p>
                        <p style={{ fontSize: "14px" }}><i>Submission Date: {p.submissionDate}</i></p>
                    </li>
                </ul>
            )}
        </div>
    );
}
