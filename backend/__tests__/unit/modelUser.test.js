const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { promisify } = require('util')

const factory = require('../factories')
const truncate = require('../utils/truncate')

describe('user', () => {
  beforeEach(async () => {
    await truncate()
  })

  it('should encrypt user password', async () => {
    const user = await factory.create('User', {
      password: '123456'
    })

    const hashCompare = await bcrypt.compare('123456', user.password_hash)

    expect(hashCompare).toBe(true)
  })

  it('should generate a jwt token', async () => {
    const user = await factory.create('User')

    const token = await user.generateToken()

    const decoded = await promisify(jwt.verify)(token, process.env.APP_SECRET)

    expect(decoded).toHaveProperty('id')
  })
})
