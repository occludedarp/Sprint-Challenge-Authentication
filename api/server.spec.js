const request = require('supertest');
const server = require('./server.js');
const bcrypt = require('bcryptjs');
const Users = require('../users/users-model.js');


describe('server.js', function() {

  describe('/api/auth/register', function() {

    it('should return JSON', function() {
      return request(server)
        .post('/api/auth/register').send({"username": "testy mctest", "password": "123"})
        .then(res => {
          expect(res.type).toMatch(/json/i);
        });
    });

    it('should return a status of 200', function() {
      return request(server)
        .post('/api/auth/register').send({"username": "testy mcfly", "password": "121"})
        .then(res => {
          expect(res.status).toBe(200)
        })
    })
  })

  describe('/api/auth/login', function() {

    it('should return JSON', function() {
      return request(server)
        .post('/api/auth/login').send({"username": "testy mcgee", "password": "124"})
        .then(res => {
          expect(res.type).toMatch(/json/i);
        });
    });

    it('should return a status of 200', function() {
      return request(server)
        .post('/api/auth/login').send({"username": "testy mctest", "password": "123"})
        .then(res => {
          expect(res.status).toBe(200)
        });
    });

  })

  describe('/api/jokes', function () {

    it('should return a status of 200 if accessed with a token', async function() {
      const auth = await request(server).post('/api/auth/login').send({"username": "testy mctest", "password": "123"})

      const token = auth.body.token

      const response = await request(server).get('/api/jokes').set('authorization', token)
      expect(response.status).toBe(200)
    })

    it('should return JSON', async function() {
      const auth = await request(server).post('/api/auth/login').send({"username": "testy mctest", "password": "123"})
  
      const token = auth.body.token
  
      const response = await request(server).get('/api/jokes').set('authorization', token)
      expect(response.type).toMatch(/json/i)
    })
  })




})