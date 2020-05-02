const request = require('supertest')
const { v4 } = require('uuid')

const app = require('../../src/app')
require('../../src/database')
const User = require('../../src/app/models/User')

const truncate = require('../utils/truncate')

beforeEach(async () => { await truncate() })

describe('authetication', () => {
  it('should autheticate with valid credentials', async () => {
    const user = await User.create({
      id: v4(),
      name: 'Alexsandro',
      email: 'aalexo1313@gmail.com',
      password_hash: '123456'
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
