const User = require('../models/User')

module.exports = {
  async store (req, res) {
    const { email, password } = req.body

    const user = await User.findOne({ where: { email } })

    if (!user) {
      return res.status(409).json({ error: 'User not exist' })
    }

    if (!await user.checkPassword(password)) {
      return res.status(401).json({ error: 'incorrect password' })
    }

    user.password = undefined
    user.password_hash = undefined
    const token = await user.generateToken()

    return res.json({ user, token })
  }
}
