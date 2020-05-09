const { Router } = require('express')

const UserController = require('./app/controllers/UserController')
const SessionController = require('./app/controllers/SessionController')
const ToDoListController = require('./app/controllers/ToDoListController')

const authMiddleware = require('./app/middlewares/auth')

const routes = Router()

routes.post('/users', UserController.store)
routes.post('/sessions', SessionController.store)

routes.use(authMiddleware)

routes.get('/to-do-lists', ToDoListController.index)

module.exports = routes
