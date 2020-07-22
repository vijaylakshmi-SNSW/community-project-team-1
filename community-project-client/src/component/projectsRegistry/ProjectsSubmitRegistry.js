import React, { useState, useEffect } from "react";

export default function ProjectsSubmitRegistry(props) {

    const [givenName, setGivenName] = useState("");
    const [surname, setSurname] = useState("");
    const [postcode, setPostcode] = useState("");
    const [description, setDescription] = useState("");

    return(
        <div>
            <form>
                <label>Given Name/s</label>
                <input placeholder="Enter Given Name here"></input>
            </form>
        </div>
    );
}