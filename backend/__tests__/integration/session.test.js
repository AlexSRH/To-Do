const request = require('supertest')

const app = require('../../src/app')
const  factory = require('../factories')

const truncate = require('../utils/truncate')

beforeEach(async () => {
  await truncate()
})

describe('authetication', () => {
  it('should autheticate with valid credentials', async () => {
    const user = await factory.create('User', {
      password: '123456'
    })

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '123456'
      })

    expect(response.status).toBe(200)
  })

  it('should not authenticate with invalid credentials', async () => {
    const user = await factory.create('User', {
      password: '123456'
    })

    const response = await request(app)
    .post('/sessions')
    .send({
      email: user.email,
      password: '123123'
    })

    expect(response.status).toBe(401)
  })

  it('should not found user', async () => {
    const user = await factory.create('User', {
      password: '123456'
    })

    const response = await request(app)
    .post('/sessions')
    .send({
      email: 'email@incorreto.com',
      password: '123465'
    })

    expect(response.status).toBe(401)
  })

  it('should return a jwt token when autheticated', async () => {
    const user = await factory.create('User', {
      password: '123456'
    })

    const response = await request(app)
    .post('/sessions')
    .send({
      email: user.email,
      password: '123456'
    })

    expect(response.body).toHaveProperty('token')
  })

  it('should be able to access private routes when autheticated', async () => {
    const user = await factory.create('User', {
      password: '123456'
    })

    const response = await request(app)
    .get(`/${user.id}/to-do-lists`)
    .set('Authorization', `Bearer ${user.generateToken()}`)

    expect(response.status).toBe(200)
  })

  it('should not be able to access private routes without jwt token', async () => {
    const user = await factory.create('User')

    const response = await request(app).get(`/${user.id}/to-do-lists`)

    expect(response.status).toBe(401)
  })

  it('should not be able to access private routes with invalid token', async () => {
    const user = await factory.create('User')

    const response = await request(app)
      .get(`/${user.id}/to-do-lists`)
      .set('Authorization', `Bearer 123456`)

    expect(response.status).toBe(401)
  })
})
