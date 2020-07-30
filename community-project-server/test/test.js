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
                    response.body.length.should.to.be.above(0);
                    done();
                })
        })
    });

    describe("POST /api/projects/submit", () => {
        it("It should return a status of 200 (successful)", (done) => {
            let project = { givenName: "tesing", lastName: "Err", postcode: 2490, description: "Park  house", title: "testting"};
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
            let project = { givenName: "tesing", lastName: "", postcode: 2490, description: "Park  house", title: "testting" };
            chai.request(server)
                // post method (source URL)
                .post('/api/projects/submit')
                .send(project)
                .end((err, response) => {  //expectation
                    response.should.have.status(400);
                    response.body.should.have.property('error');
                    chai.expect(response.body.error).to.be.an('array');
                    // chai.expect(response.body.error).to.have.lengthOf(1);
                    chai.expect(response.body.error[0]).eq('Last name can only have 50 charecters');
                    done();
                });
        });

        it("It should not post a submit with postcode starting with any number except 2 and more than length of 4", (done) => {
            let project = { givenName: "Adam", lastName: "Smith", postcode: 3557, description: "3 day work week.", title: "testting" };
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

    describe("GET /api/projects/{status}", () => {
        it("It should GET all the projects where status == 'rejected'", (done) => {
            chai.request(server)
             // get method (source URL)
                .get('/api/projects/rejected')
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.data[0].should.have.property('status').eql('rejected');
                    done();
                })
        })

        it("It should GET all the projects where status == 'approved'", (done) => {
            chai.request(server)

                // get method (source URL)
                .get('/api/projects/approved')
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.data[0].should.have.property('status').eql('approved');
                    done();
                })
        })

        it("It should GET all the projects where status == 'pending' ", (done) => {
            chai.request(server)

                // get method (source URL)
                .get('/api/projects/pending')
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.data[0].should.have.property('status').eql('pending');
                    done();
                })
        })

        it("It should return error where status == '' ", (done) => {
            chai.request(server)

                // get method (source URL)
                .get('/api/projects/{status}')
                .end((err, response) => {
                    response.should.have.status(400);
                    response.body.should.have.property('error');
                    done();
                })
        })

        it("It should return error where status == 'vhtht' ", (done) => {
            chai.request(server)

                // get method (source URL)
                .get('/api/projects/{status}')
                .end((err, response) => {
                    response.should.have.status(400);
                    response.body.should.have.property('error');
                    done();
                })
        })

        it("It should return error where status == @3432 ", (done) => {
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
            let data = { 'id': '2ae3f2ae-6da2-4852-b00c-3b1bf66e1d91', 'status': 'approved' }
            chai.request(server)
                .put('/api/projects/status/update')
                .send(data)
                .end((err, response) => {  
                    response.should.have.status(200);
                    response.body.data.value.should.have.property('status').eql('approved');
                    done();
                });
        });
        it("It should change the status of the project to rejected", (done) => {
            let data = { 'id': '2ae3f2ae-6da2-4852-b00c-3b1bf66e1d91', 'status': 'rejected' }
            chai.request(server)
                // post method (source URL)
                .put('/api/projects/status/update')
                .send(data)
                .end((err, response) => {  //expectation
                    response.should.have.status(200);
                    response.body.data.value.should.have.property('status').eql('rejected');
                    done();
                });
        });

        it("It should return an error if the status is not 'approved' or 'declined ", (done) => {
            let data = { 'id': 'f1c24192-e2f0-46e1-baad-2b2eb4188ba6', 'status': 'gfdgrtge' }
            chai.request(server)
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

        describe("PUT /api/projects/vote", () => {
            it("it should return voteCount + 1", (done) => {
                let data = { 'id': '2ae3f2ae-6da2-4852-b00c-3b1bf66e1d91'}
                let voteCountValue = 0;
                chai.request(server)
                .get('/api/projects/id/2ae3f2ae-6da2-4852-b00c-3b1bf66e1d91')
                .end((err,response)=>{ 
                    console.log('count'+response.body.voteCount);
                voteCountValue = Number(response.body.voteCount);
                })
                chai.request(server)
                .put('/api/projects/vote')
                .send(data)
                .end((err, response) => {  //expectation
                    response.should.have.status(200);
                    response.body.data.content.value.should.have.property('voteCount').eq(voteCountValue + 1);
                    done();
                });
            });


    });

});

