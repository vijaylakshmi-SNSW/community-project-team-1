const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server/server');
//Assertion style
chai.should();
chai.expect();

chai.use(chaiHttp);
// chai.request(server)
describe('tasks Community Project API', () => {


    //Added this to stop multiple node process being created- afterEach will 
    afterEach((done) => {
        delete require.cache[require.resolve('../server/server')]
        done()
    });


    // //Test the GET ROUTE
    describe("GET /api/projects", () => {
        it("It should GET all the eligible projects", (done) => {
            chai.request(server)

                // get method (source URL)
                .get('/api/projects')
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    response.body.length.should.be.eq(9);
                    done();
                })
        })
    });

    describe("POST /api/projects/submit", () => {
        it("It should return a status of 200 (successful)", (done) => {
            let project = { givenName: "Soonal", lastName: "Err", postcode: 2490, description: "Park  house" };
            chai.request(server)
                // post method (source URL)
                .post('/api/projects/submit')
                .send(project)
                .end((err, response) => {  //expectation
                    response.should.have.status(200);
                    done();
                });
        });
        it("It should not post a submit with any empty property", (done) => {
            let project = { givenName: '', lastName: "Smith", postcode: 2557, description: "3 day work week." };
            chai.request(server)
                // post method (source URL)
                .post('/api/projects/submit')
                .send(project)
                .end((err, response) => {  //expectation
                    response.should.have.status(400);
                    response.body.should.have.property('error');
                    chai.expect(response.body.error).to.be.an('array');
                    // chai.expect(response.body.error).to.have.lengthOf(1);
                    chai.expect(response.body.error[0]).eq('Given name can only have 50 charecters');
                    done();
                });
        });

        it("It should not post a submit with postcode starting with any number except 2 and more than length of 4", (done) => {
            let project = { givenName: "Adam", lastName: "Smith", postcode: 3557, description: "3 day work week." };
            chai.request(server)
                // post method (source URL)
                .post('/api/projects/submit')
                .send(project)
                .end((err, response) => {  //expectation
                    response.should.have.status(400);
                    response.body.should.have.property('error');
                    chai.expect(response.body.error[0]).eq('incorrect postcode');
                    done();
                });
        });
    });

    describe("GET //api/projects/{status}", () => {
        it("It should GET all the projects where status == 'declined'", (done) => {
            chai.request(server)

                // get method (source URL)
                .get('/api/projects/{status}')
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    done();
                })
        })

        it("It should GET all the projects where status == 'approved'", (done) => {
            chai.request(server)

                // get method (source URL)
                .get('/api/projects/{status}')
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    done();
                })
        })

        it("It should GET all the projects where status == 'pending' ", (done) => {
            chai.request(server)

                // get method (source URL)
                .get('/api/projects/{status}')
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    done();
                })
        })

        it("It should GET all the projects where status == '' ", (done) => {
            chai.request(server)

                // get method (source URL)
                .get('/api/projects/{status}')
                .end((err, response) => {
                    response.should.have.status(400);
                    response.body.should.have.property('error');
                    done();
                })
        })

        it("It should GET all the projects where status == 'vhtht' ", (done) => {
            chai.request(server)

                // get method (source URL)
                .get('/api/projects/{status}')
                .end((err, response) => {
                    response.should.have.status(400);
                    response.body.should.have.property('error');
                    done();
                })
        })

        it("It should GET all the projects where status == @3432 ", (done) => {
            chai.request(server)

                // get method (source URL)
                .get('/api/projects/{status}')
                .end((err, response) => {
                    response.should.have.status(400);
                    response.body.should.have.property('error');
                    done();
                })
        })
    });

    describe("PUT /api/projects/status/update", () => {
        it("It should change the status of the project from 'pending' to approved", (done) => {
            let data = { 'id': '66b13735-a34c-4a1b-8a0a-4b265b8d5f6d', 'status': 'approved' }
            chai.request(server)
                // post method (source URL)
                .put('/api/projects/status/update')
                .send(data)
                .end((err, response) => {  //expectation
                    response.should.have.status(200);
                     chai.expect(response.body.data.value.status).eq('approved');
                    done();
                });
        });
        it("It should change the status of the project from 'pending' to declined", (done) => {
            let data = { 'id': 'f1c24192-e2f0-46e1-baad-2b2eb4188ba6', 'status': 'declined' }
            chai.request(server)
                // post method (source URL)
                .put('/api/projects/status/update')
                .send(data)
                .end((err, response) => {  //expectation
                    response.should.have.status(200);
                    chai.expect(response.body.data.value.status).eq('declined');
                    done();
                });
        });

        it("It should return an error if the status is not 'approved' or 'declined ", (done) => {
            let data = { 'id': 'f1c24192-e2f0-46e1-baad-2b2eb4188ba6', 'status': 'gfdgrtge' }
            chai.request(server)
                // post method (source URL)
                .put('/api/projects/status/update')
                .send(data)
                .end((err, response) => {  //expectation
                    response.should.have.status(400);
                    response.body.should.have.property('error');
                    done();
                });
            });

            it("It should return an error if the status is undefined, empty or not a string ", (done) => {
                let data = { 'id': 'f1c24192-e2f0-46e1-baad-2b2eb4188ba6', 'status': '' }
                chai.request(server)
                    // post method (source URL)
                    .put('/api/projects/status/update')
                    .send(data)
                    .end((err, response) => {  //expectation
                        response.should.have.status(400);
                        response.body.should.have.property('error');
                        done();
                    });
            });


        });



    });

