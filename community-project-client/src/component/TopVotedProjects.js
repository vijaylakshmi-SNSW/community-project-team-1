import React from "react";

export default function TopVotedProjects({ projects, loading }) {

    if (loading)
        return <h2>Loading...</h2>;
    return (
        <div className="top-voted-projects-list">
            {projects.map(p =>
                <ul key={p.id}>
                    <li key={p.id} style={{ listStyle: "none", padding: "5px", border: "black solid 1px" }}>
                        <p>Title: {p.title}</p>
                        <p style={{ height: "150px" }}>Description: {p.description}</p>
                        <p>Votes: {p.voteCount}</p>
                        <p style={{ fontSize: "14px", textAlign: "end" }}>{p.submissionDate}</p>
                    </li>
                </ul>
            )}
        </div>
    );
}
