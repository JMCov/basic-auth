'use strict';

const supertest = require('supertest');
const { app } = require('../src/server');
const request = supertest(app);
const { sequelizeDB } = require('../src/auth/models/index');

beforeAll(async () => {
  await sequelizeDB.sync();
});

afterAll(async () => {
  await sequelizeDB.drop();
});

describe('Auth router', () => {
  it('should create a new user', async () => {
    const response = await request.post('/signup').send({
      username: 'Jordan',
      password: '123456',
    });
    expect(response.status).toBe(200);
  });

  it('should login a user', async () => {

    let response = await request.post('/signin').auth('Jordan', '123456');

    expect(response.status).toBe(200);
    expect(response.body.username).toBe('Jordan');

  });



});