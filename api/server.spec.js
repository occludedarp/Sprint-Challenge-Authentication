const request = require('supertest');
const server = require('./server.js');

describe('server.js', function() {

  describe('/api/auth/register', function() {
    it('should return JSON', function() {
      return request(server)
        .post('/api/auth/register').send({"username": "testy mctest", "password": "123"})
        .then(res => {
          expect(res.type).toMatch(/json/i);
        });
    });

    it.todo('should create a hashed password')
  })

  describe('/api/auth/login', function() {
    it.todo('should send a body containing a username and password')
    it.todo('should return a token upon providing valid credentials')
  })

  describe('/api/jokes', function () {
    it.todo('should have access to the token')
    it.todo('should make a request to grab the token')
    it.todo('should return jokes if the middelware allows access')
  })
})