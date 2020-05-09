const request = require('supertest')

const app = require('../../src/app')
const factory = require('../utils/factories')
const truncate = require('../utils/truncate')

beforeEach(truncate)

describe('Authentication', () => {
  it('should authenticate with valid credentials', async () => {
    const user = await factory.create('User')
    const response = await request(app)
      .post('/sessions')
      .send({ email: user.email, password: user.password })

    expect(response.status).toBe(200)
  })

  it('should not authenticate with invalid credentials', async () => {
    const user = await factory.create('User')
    const response = await request(app)
      .post('/sessions')
      .send({ email: user.email, password: '123123' })

    expect(response.status).toBe(401)
  })

  it('should receive a JWT token when autheticate', async () => {
    const user = await factory.create('User')
    const response = await request(app)
      .post('/sessions')
      .send({ email: user.email, password: user.password })

    expect(response.body).toHaveProperty('token')
    expect(response.status).toBe(200)
  })

  it('should access private route when authenticated', async () => {
    const user = await factory.create('User')
    const token = await user.generateToken()

    const response = await request(app)
      .get('/to-do-lists')
      .set({ Authorization: `Bearer ${token}` })

    expect(response.status).toBe(200)
  })

  it('should not access private route when not authenticated', async () => {
    const response = await request(app)
      .get('/to-do-lists')

    expect(response.status).toBe(401)
  })

  it('should not access private route when not authenticated', async () => {
    const user = await factory.create('User')
    const token = await user.generateToken()

    const response = await request(app)
      .get('/to-do-lists')
      .set({ Authorization: token })

    expect(response.status).toBe(401)
  })

  it('should not access private route when not authenticated', async () => {
    const response = await request(app)
      .get('/to-do-lists')
      .set({ Authorization: 'Bearer 123456' })

    expect(response.status).toBe(401)
  })
})
