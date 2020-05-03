const User = require('../models/User')

module.exports = {
  async store (req, res) {
    const { name, email, password } = req.body

    const checkUser = await User.findOne({ where: { email } })

    if (checkUser)
      return res.status(401).json({ error: 'User already created' })

    const user = await User.create({
      name,
      email,
      password
    })

    user.password = undefined
    user.password_hash = undefined

    const token = user.generateToken()

    return res.json({ user, token })
  }
}
