import React from "react";
import { BrowserRouter as Router, Switch, Link, Route } from "react-router-dom";

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
                <Link to="/projects">
                    <li>Projects</li>
                </Link>
            </ul>
        </div>
    );
}