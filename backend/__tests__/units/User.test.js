const bcrypt = require('bcryptjs')

const factory = require('../utils/factories')
const truncate = require('../utils/truncate')

beforeEach(truncate)

describe('User Controller', () => {
  it('should encrypt user password when create an user', async () => {
    const user = await factory.create('User', { password: '123456' })

    const passwordCompare = await bcrypt.compare('123456', user.password_hash)

    expect(passwordCompare).toBe(true)
  })
})
