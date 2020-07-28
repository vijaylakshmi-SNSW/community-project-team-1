import React, { useEffect, useState } from "react";

export default function ViewVotingResults() {

    const [projects, setProjects] = useState([]);

    useEffect(() => {
        fetch("http://localhost:4000/api/projects/admin")
            .then(res => res.json())
            .then(json => setProjects(json));
    }, []);

    return (
        <div>
            
        </div>
    );
}