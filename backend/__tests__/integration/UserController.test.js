const request = require('supertest')
const faker = require('faker')

const app = require('../../src/app')
const truncate = require('../utils/truncate')

beforeEach(truncate)

describe('User Controller', () => {
  it('should create a User', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.internet.password()
      })

    expect(response.status).toBe(200)
    expect(response.body.user).toHaveProperty('id')
  })
})
