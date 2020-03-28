const request = require('supertest');
const server = require('./server.js');
const bcrypt = require('bcryptjs');
const Users = require('../users/users-model.js');


describe('server.js', function() {

  describe('/api/auth/register', function() {

    it('should return JSON', function() {

      const user = {"username": "testy mctest", "password": "123"}

      return request(server)
        .post('/api/auth/register').send(user)
        .then(res => {
          expect(res.type).toMatch(/json/i);
        });
    });

    it('should have a property of username', function() {
      
      return request(server)
        .post('/api/auth/register').send({"username": "testy mcfly", "password": "121"})
        .then(res => {
         expect(res.body).toBe({})
        })
    })
  })

  describe('/api/auth/login', function() {
    it.todo('should send a body containing a username and password')
    it.todo('should return a token upon providing valid credentials')
  })

  describe('/api/jokes', function () {
    it.todo('should have access to the token')
    it.todo('should request the token')
    it.todo('should return jokes if token was valid')
    it.todo('should return a content header with length of 2010')
  })

})