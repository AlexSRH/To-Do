const User = require('../models/User')

module.exports = {
  async store (req, res) {
    const { name, email, password } = req.body

    if (await User.findOne({ where: { email } })) {
      return res.status(409).json({ error: 'User already created' })
    }

    const user = await User.create({ name, email, password })
    const token = await user.generateToken()

    user.password = undefined
    user.password_hash = undefined

    return res.json({ user, token })
  }
}
