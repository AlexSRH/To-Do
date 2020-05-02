const request = require('supertest')

const app = require('../../src/app')
const  factory = require('../factories')

const truncate = require('../utils/truncate')

describe('authetication', () => {
  beforeEach(async () => {
    await truncate()
  })

  it('should autheticate with valid credentials', async () => {
    const user = await factory.create('User', {
      password: '123456'
    })

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password_hash: 123456
      })

    expect(response.status).toBe(200)
  })
})
