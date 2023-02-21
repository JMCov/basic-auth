'use strict';

const supertest = require('supertest');
const { app } = require('../src/server');
const request = supertest(app);

describe('Auth Login/Logout', () => {
  it('should create a new user', async () => {
    const response = await request.post('/signup').send({
      username: 'Jordan',
      password: '123456',
    });
    expect(response.username).toBe('Jordan');
    console.log(response);
  });

});