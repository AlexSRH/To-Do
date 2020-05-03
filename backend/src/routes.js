const { Router } = require('express')

const routes = Router()

const authMiddleware = require('./app/middlewares/auth')

const SessionController = require('./app/controllers/SessionController')

routes.post('/sessions', SessionController.store)

routes.use(authMiddleware)

routes.get('/to-do-lists', (req, res) => {
  return res.send()
})

module.exports = routes
