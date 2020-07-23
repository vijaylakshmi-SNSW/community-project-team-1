import React from "react";
import { Link } from "react-router-dom";

export default function Nav() {



    return(
        <div>
            <ul className="nav-links">
                <Link to="/home">
                    <li>Home</li>
                </Link>
                <Link to="/about">
                    <li>About</li>
                </Link>
                <Link to="/project-registry">
                    <li>Projects</li>
                </Link>
            </ul>
        </div>
    );
}