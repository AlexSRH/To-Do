const { Router } = require('express')

const routes = Router()

const authMiddleware = require('./app/middlewares/auth')

const UserController = require('./app/controllers/UserController')
const SessionController = require('./app/controllers/SessionController')
const ToDoListController = require('./app/controllers/ToDoListController')

routes.post('/users', UserController.store)
routes.post('/sessions', SessionController.store)

routes.use(authMiddleware)

routes.get('/:user_id/to-do-lists', ToDoListController.index)
routes.post('/:user_id/to-do-lists', ToDoListController.store)

module.exports = routes
