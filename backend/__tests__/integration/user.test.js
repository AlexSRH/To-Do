const request = require('supertest')
const faker = require('faker')

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

    expect(response.body.user.email).toBe(email)
  })
})
