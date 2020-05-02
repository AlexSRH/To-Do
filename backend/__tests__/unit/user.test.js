const bcrypt = require('bcryptjs')

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
})
