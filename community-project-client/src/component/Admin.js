import React, { useState, useEffect } from "react";
import Result from './Result';
import Pagination from "./Pagination";

export default function Admin() {
    const [projects, setProjects] = useState([]);
    const [showUpdateMessage,setShowUpdateMessage] = useState(false); 
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [projectsPerPage] = useState(5);
    // const [currentProjects, setCurrentProjects] = useState([])

    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;
    let currentProjects = projects.slice(indexOfFirstProject,indexOfLastProject)
    const paginate = pageNumber => setCurrentPage(pageNumber);


    useEffect(() => {
        setLoading(true);
        fetch("http://localhost:4000/api/projects/pending")
            .then(res => res.json())
            .then(projects => 
                setProjects(projects.data));
                setLoading(false);    
    }, []);

    
    function getProjectsByStatus(e) {

        if(e.target.value !== ""){
             //stop the form from submitting and making a synchronous post request
            e.preventDefault();
            //instead we are making an asynchronous request using fetch        
            fetch(`http://localhost:4000/api/projects/${e.target.value}`, {headers: { 'Content-Type': 'application/json' }})
                .then((response) => response.json())
                .then(json => {
                    setProjects(json.data);
                    currentProjects = projects.slice(indexOfFirstProject,indexOfLastProject)
                    setShowUpdateMessage(false); 
                });
        }
    }

    return (
        <div >           
            <label style={{'padding': '10px'}}>Please select a status to view projects:</label>           
            <select style={{'padding': '10px'}} name='status' onChange={getProjectsByStatus}>
                <option value="">Select a status </option>
                <option value="approved">Approved</option>
                <option value="rejected">Declined</option>
                <option value="pending">Pending</option>
            </select>  
            
           {/* <div>
                {
                    (projects.map(p=>p.status === 'pending' && <p> Currently there are {projects.length} projects to review</p>)
                    
                )}
            </div> */}
            <div>
                <br />
                <br />
                {currentProjects.map(p => <Result key={p.id} project={p} 
                updateMessage={{showUpdateMessage,setShowUpdateMessage}} 
                // projects={currentProjects} 
                loading={loading}/>)}             
                <br />
            </div>

            <div>
                <Pagination
                    projectsPerPage={projectsPerPage}
                    totalPosts={projects.length}
                    paginate={paginate}
                />
            </div>
        </div>
    )
}