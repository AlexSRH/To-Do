const User = require('../models/User')

module.exports = {
  async store (req, res) {
    const { email, password } = req.body

    const user = await User.findOne({ where: { email } })

    if (!user)
      return res.status(401).json({ error: 'User not found' })

    if (!(await user.checkPassword(password)))
      return res.status(401).json({ error: 'Incorrect password' })

    user.password_hash = undefined

    return res.json({
      user,
      token: user.generateToken()
    })
  }
}
