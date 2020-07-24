const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const storage = require('node-persist');
const server = express();
server.use(express.json());
server.use(bodyParser.json());
server.use(cors());
const port = 4000;
const { validateGivenName, validatePostcode, validateDescription, validateLastName, validateStatus } = require('./validate');



(async () => {
    await storage.init({ dir: "./data" });

    //display all the projects available in data
    //http://localhost:4000/api/projects
    server.get("/api/projects/admin", async (req, res) => {
        res.json(await storage.valuesWithKeyMatch(/project-/));
    });


    //submit a project and return a message 
    //http://localhost:4000/api/projects/submit
    server.post("/api/projects/submit", async (req, res) => {
        let data = req.body;
        let givenName = req.body.givenName;
        let lastName = req.body.lastName;
        let postcode = req.body.postcode;
        let description = req.body.description;
        let errors = [];
        if (!validatePostcode(postcode)) {
            res.status(400);
            errors.push("incorrect postcode");
        }
        if (!validateGivenName(givenName)) {
            res.status(400);
            errors.push("Given name can only have 50 charecters");
            //res.json({ status: 500, error: "Given name can only have 50 charecters" });
        }
        if (!validateLastName(lastName)) {
            res.status(400);
            errors.push("Last name can only have 50 charecters");
        }

        if (!validateDescription(description)) {
            res.status(400);
            errors.push("Description should not exceed 300 charecters");
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
            res.json({ error: errors })
        }

    });


    //Display only the pending projects for administrator
    //http://localhost:3000/api/projects/{status}      
    server.get("/api/projects/{status}", async (req, res) => {
        let status = req.params.status;
        if (!validateStatus(status)) {
            res.status(400);
            res.json({ error: "status value can only be 'pending', 'approved' or 'declined' ", status: 400 });
        } else {
        let allProjects = await storage.valuesWithKeyMatch(/project-/);
        let result = allProjects.filter(p => p.status === status);
        res.json({data:result, status: 200} );
        } 
    });

    // //put method to update the status for admin
    // //http://localhost:3000/api/projects/status/update
    server.put('/api/projects/status/update', async (req, res) => {
        let id = req.body.id;
        let status = req.body.status;
        if (!validateStatus(status)) {
            res.status(400);
            res.json({ error: "status value can only be 'pending', 'approved' or 'declined' ", status: 400 });
        } else {
            let foundObject = await storage.getItem(`project-${id}`);
            let key = `project-${id}`
            foundObject.status = status;
            let result = await storage.updateItem(key, foundObject)
            res.json({ data: result.content, status: 200 })

        }

    });


    server.listen(port, () => console.log(`Server listening at port ${port}`));
})();

module.exports = server;
