const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const storage = require('node-persist');
const projects = require('../projects.json');
const server = express();
server.use(express.json());
server.use(bodyParser.json());
server.use(cors());
const port = 3000;
const { validateGivenName, validatePostcode, validateDescription } = require('./validate');



(async () => {
    await storage.init({ dir: "./data" });

    //display all the projects available in data
    //http://localhost:3000/api/projects
    server.get("/api/projects/admin", async (req, res) => {
        res.json(await storage.valuesWithKeyMatch(/project-/));
    });


    //submit a project and return a message 
    //http://localhost:3000/api/projects/submit
    server.post("/api/projects/submit", async (req, res) => {
        let data = req.body;
        let givenName = req.body.givenName;
        let lastName = req.body.lastName;
        let postcode = req.body.postcode;
        let description = req.body.description;
        let errors = [];
        if (!validatePostcode(postcode)) {
            res.status(400);
            errors.push("incorrect postcode" );
        }
        if (!validateGivenName(givenName)) {
            res.status(400);
            errors.push("Given name can only have 50 charecters" );
            //res.json({ status: 500, error: "Given name can only have 50 charecters" });
        }
        if (!validateLastName(lastName)) {
            res.status(400);
            errors.push("Last name can only have 50 charecters" );
        }

        if (!validateDescription(description)) {
            res.status(400);
            errors.push("Description should not exceed 300 charecters" );
        }
        if (errors.length == 0) {
            let project = {
                id: uuidv4(),
                ...data,
                status: 'pending',
                submissionDate: new Date().toISOString().slice(0, 10)
            }

            await storage.setItem(`project-${project.id}`, project);
            res.json({ status: 200, msg: "Thank you for your submission, we will treat it as Revenue NSW would." });
        } else {
            res.json({error: errors})
        }

    });


    //Display only the eligible projects for Public 
    //http://localhost:3000/api/projects
    server.get("/api/projects", async (req, res) => {
        let allProjects = await storage.valuesWithKeyMatch(/project-/);
        let result = allProjects.filter(p => p.status == true);
        res.json(result);
    });

    //Display only the pending projects for administrator
    //http://localhost:3000/api/projects/pending      
    server.get("/api/projects/pending", async (req, res) => {
        let allProjects = await storage.valuesWithKeyMatch(/project-/);
        let result = allProjects.filter(p => p.status == "pending");
        res.json(result);
    });

    //Display only the declined projects for administrator
    //http://localhost:3000/api/projects/declined      
    server.get("/api/projects/declined", async (req, res) => {
        let allProjects = await storage.valuesWithKeyMatch(/project-/);
        let result = allProjects.filter(p => p.status == false);
        res.json(result);
    });


    server.listen(port, () => console.log(`Server listening at port ${port}`));
})();

module.exports = server;
