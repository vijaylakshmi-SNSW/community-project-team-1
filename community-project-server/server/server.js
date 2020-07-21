const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const storage = require('node-persist');
const projects = require('../projects.json');
const { getItem } = require('node-persist');
const server = express();
server.use(express.json());
server.use(bodyParser.json());
server.use(cors());
const port = 3000;

(async()=>{
    await storage.init({dir: "./data"});
// server side
    server.get("/api/projects", async(req,res)=>{  
        res.json(await storage.valuesWithKeyMatch(/project-/));   
    });

    server.post("/api/projects/submit", async(req,res)=>{
        let data = req.body;
        let project = {
            id: uuidv4(),
            ...data,
            submissionDate: new Date().toISOString().slice(0,10)
        }
        await storage.setItem(`project-${project.id}`,project);
        res.json({status:200,msg:"Thank you for your submission, we will treat it as Revenue NSW would."});
    });

    server.listen(port, () => console.log(`Server listening at port ${port}`));
})();