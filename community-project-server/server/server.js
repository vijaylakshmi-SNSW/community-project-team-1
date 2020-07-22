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
    server.get("/api/projects", async (req, res) => {
        res.json(await storage.valuesWithKeyMatch(/project-/));
    });


     //submit a project and return a message 
    //http://localhost:3000/api/projects/submit
    server.post("/api/projects/submit", async (req, res) => {
        let data = req.body;
        let givenName = req.body.givenName;
        let lastName = req.body.lastName;
        let postcode = req.body.postcode;
        let description =req.body.description;
        if (!validatePostcode(postcode)) {
            res.json({ status: 500, error: "incorrect postcode" });
        }
        if (!validateGivenName(givenName)) {
            res.json({ status: 500, error: "Given name can only have 50 charecters" });
        }
        if (!validateDescription(description)){
            res.json({status:500, error: "Description should not exceed 300 charecters"});
        }
        let project = {
            id: uuidv4(),
            ...data,
            submissionDate: new Date().toISOString().slice(0, 10)
        }

        //Display only the eligible projects for Public 
        //http://localhost:3000/api/projects/eligible
        server.get("/api/projects/eligible", async (req, res) => {  //incorrect working on it
            res.json({data: status == true, status: 200})
        });

        //Display only the pending projects for administrator
        //http://localhost:3000/api/projects/pending      
        server.get("/api/projects/eligible", async (req, res) => {    //incorrect working on it
            res.json({data: status == true, status: 200})
        });


        await storage.setItem(`project-${project.id}`, project);
        res.json({ status: 200, msg: "Thank you for your submission, we will treat it as Revenue NSW would." });

    });




    server.listen(port, () => console.log(`Server listening at port ${port}`));
})();

module.exports = server;