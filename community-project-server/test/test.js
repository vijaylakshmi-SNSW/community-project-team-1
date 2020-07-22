const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server/server');

//Assertion style
chai.should();

chai.use(chaiHttp);

describe('tasks Community Project API', () => {

    // Test the GET ROUTE
        describe("GET /api/projects", () => {
            it("It should GET all the eligible projects", (done) => {
                chai.request(server)
                // get method (source URL)
                .get('/api/projects')
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    response.body.length.should.be.eq(4);
                    done();
                })
            })
        }),

        describe("POST /api/projects/submit", () => {
            it("It should return a status of 200 (successful)", (done) => {
                let project = { givenName: "Daffy", postcode: 2557, description: "3 day work week."};
                chai.request(server)
                // post method (source URL)
                .post('/api/projects/submit')
                .send(project)
                .end((err, response) => {
                    response.should.have.status(200);
                    done();
                })
            })
        })

});
