import React, { useState, useEffect } from "react";
import Projects from './Projects';
import Pagination from '../Pagination';


export default function ViewProjects() {


    const [projects, setProjects] = useState([]);
    const [updateVoteCount, setUpdateVoteCount] = useState(0);
    const [showVoteButton, setShowVoteButton] = useState(true);

    const [currentPage, setCurrentPage] = useState(1);
    const [projectsPerPage] = useState(5);

    useEffect(() => {
        fetch("http://localhost:4000/api/projects/approved")
            .then(res => res.json())
            .then(projects => {
                setUpdateVoteCount(0);
                setProjects(projects.data)
            })
    }, []);

    // get current projects - pagination
    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;
    const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);

    // change page - pagination
    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div className="viewprojects-eligible">
            <div className="viewall-container">
                <div className="eligible-projects-image">
                    <img src="https://www.nsw.gov.au/sites/default/files/styles/content_x1/public/2020-02/My-Community-Project-Eligible-Projects-DataCard-Banner-v04.png?itok=TUeWyMMC" alt="Community Project"></img>
                </div>
            </div>
            <h1>Projects</h1>
            <p>Browse the projects that have been approved for consideration.</p>
            <p>New project submissions are still being accepted. </p>
            <Projects projects={currentProjects} updateVoteCount={updateVoteCount} showVoteButton={showVoteButton} />
            <Pagination projectsPerPage={projectsPerPage} totalPosts={projects.length} paginate={paginate} />
        </div>


    );
}
