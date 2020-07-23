import React from "react";
import { Link } from "react-router-dom";

export default function Nav() {



    return(
        <div>
            <ul className="nav-links">
                <Link to="/home">
                    <li>Home</li>
                </Link>
                <Link to="/project-registry">
                    <li>Submit</li>
                </Link>
                <Link to="/view-all">
                    <li>View All</li>
                </Link>
            </ul>
        </div>
    );
}