import React, { useState, useEffect } from "react";
import ProjectsSubmit from "./ProjectsSubmitRegistry";

export default function ProjectsRegistry() {

    const [projects, setProjects] = useState([])

    useEffect(()=>{
        fetch("http://localhost:3000/api/projects")
        .then(res=>res.json())
        .then(projects=>res.json(projects));
    },[]);

    const submitProject = p => {
        setProjects(...projects, p);
    }

    return(
        <div>
            <div>
                <ProjectsSubmitRegistry submitProject={submitProject} />
            </div>
        </div>
    );
}