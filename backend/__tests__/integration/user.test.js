const request = require('supertest')
const faker = require('faker')

require('../../src/database')
const User = require('../../src/app/models/User')
const app = require('../../src/app')

describe('User routes', () => {
  const email = faker.internet.email()

  it('should create a user', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: faker.name.findName(),
        email,
        password: faker.internet.password()
      })

    expect(response.body.email).toBe(email)
  })
})
