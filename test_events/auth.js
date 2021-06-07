/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const mongoose = require('mongoose');
const user = require('../common/repos/user');
// Assertion Style
chai.should();
chai.use(chaiHttp);

describe('AUTH API', () => {
  // Test the registration api

  describe('POST /api/auth/register', () => {
    it('It should register a user', (done) => {
      const registrationData = {
        name: 'Tharindu De Zoysa',
        email: 'tharindu.2015188@iit.ac.lk',
        password: 'testing',
        role: 'admin'
      };
      chai
        .request(server)
        .post('/api/auth/register')
        .send(registrationData)
        .end((err, response) => {
          response.should.have.status(201);
          done();
        });
    });
  });

  describe('POST /api/auth/register', () => {
    it('It should {not register} a user', (done) => {
      const registrationData = {
        name: 'Tharindu De Zoysa',
        email: 'tharindud.20191104@iit.ac.lk',
        password: 'testing',
        role: 'admin'
      };
      chai
        .request(server)
        .post('/api/auth/register')
        .send(registrationData)
        .end((err, response) => {
          response.should.have.status(400);
          done();
        });
    });
  });

  //   User login

  describe('POST /api/auth/login', () => {
    it('It should login a user', (done) => {
      const loginData = {
        email: 'sachintha123@hotmail.com',
        password: 'passwords'
      };
      chai
        .request(server)
        .post('/api/auth/login')
        .send(loginData)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('object');
          response.body.should.have.property('access_token');
          done();
        });
    });
  });

  afterEach((done) => {
    user.findOneAndDelete({ email: 'sachintharindu70@gmail.com' }).exec();
    done();
  });
  after((done) => {
    mongoose.connection.close();
    server.close(done());
    // done()
  });
});
