const bcrypt = require('bcryptjs')

const factory = require('../factories')

describe('User Controller', () => {
  it('should encrypt user password', async () => {
    const user = await factory.create('user', { password: '123456' })

    const passwordCompare = await bcrypt.compare('123456', user.password_hash)

    expect(passwordCompare).toBe(true)
  })
})
