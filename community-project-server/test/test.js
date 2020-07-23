const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server/server');
//Assertion style
chai.should();
chai.expect();

chai.use(chaiHttp);
chai.request(server)
describe('tasks Community Project API', () => {


    //Added this to stop multiple node process being created
    afterEach((done) => {
        delete require.cache[require.resolve('../server/server')]
        done()
    });


    // //Test the GET ROUTE
    // describe("GET /api/projects", () => {
    //     it("It should GET all the eligible projects", (done) => {
    //         chai.request(server)

    //             // get method (source URL)
    //             .get('/api/projects')
    //             .end((err, response) => {
    //                 response.should.have.status(200);
    //                 response.body.should.be.a('array');
    //                 response.body.length.should.be.eq(9);
    //                 done();
    //             })
    //     })
    // });

    // describe("POST /api/projects/submit", () => {
    //     it("It should return a status of 200 (successful)", (done) => {
    //         let project = { givenName: "Soonal", lastName: "Err" ,postcode: 2490, description: "Park  house"};
    //         chai.request(server)
    //         // post method (source URL)
    //         .post('/api/projects/submit')
    //         .send(project)
    //         .end((err, response) => {  //expectation
    //             response.should.have.status(200);
    //             done();
    //         });
    //     });
    // });

    describe("POST /api/projects/submit", () => {
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
    });

    describe("POST /api/projects/submit", () => {
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

    



});

