const { Router } = require('express')

const routes = Router()

const SessionController = require('./app/controllers/SessionController')

routes.post('/sessions', SessionController.store)

module.exports = routes
