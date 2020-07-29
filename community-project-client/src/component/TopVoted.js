import React, { useEffect, useState } from "react";
import TopVotedProjects from "./TopVotedProjects";
import Pagination from "./Pagination";

export default function TopVoted() {

    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [projectsPerPage] = useState(5);

    useEffect(() => {
        setLoading(true);
        fetch("http://localhost:4000/api/projects/approved")
            .then(res => res.json())
            .then(projects => setProjects(projects.data));
        setLoading(false);
    }, []);
    
    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;
    const currentProjects = projects.sort((p1, p2) => p2.voteCount - p1.voteCount).slice(indexOfFirstProject, indexOfLastProject)

    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div className="top-voted-container">
            <div className="top-voted-title">
                <h1>Popular Projects</h1>
            </div>
            <div>
                <TopVotedProjects
                    projects={currentProjects}
                    loading={loading}
                />
            </div>
            <div>
                <Pagination
                    projectsPerPage={projectsPerPage}
                    totalPosts={projects.length}
                    paginate={paginate}
                />
            </div>
        </div>
    );
}
