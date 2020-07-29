import React, { useState, useEffect } from "react";
import ProjectsSubmitRegistry from "./ProjectsSubmitRegistry";

export default function ProjectsRegistry() {

    const [projects, setProjects] = useState([]);

    useEffect(()=>{
        fetch("http://localhost:4000/api/projects")
        .then(res=>res.json())
        .then(projects=>setProjects(projects));
    },[]);



    const submitProject = p => {
        setProjects({...projects, p});
    }

    

    return(
        <div>
            <div>
                <ProjectsSubmitRegistry submitProject={submitProject} />
            </div>
        </div>
    );
}