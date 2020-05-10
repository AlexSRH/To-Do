const routes = require('express').Router()

const UserController = require('./app/controllers/UserController')
const SessionController = require('./app/controllers/SessionController')
const ToDoListController = require('./app/controllers/ToDoListController')

const authMiddleware = require('./app/middlewares/auth')

routes.post('/users', UserController.store)
routes.post('/sessions', SessionController.store)

routes.use(authMiddleware)

routes.get('/to-do-lists', ToDoListController.index)
routes.post('/to-do-lists', ToDoListController.store)

routes.delete('/to-do-lists/:id', ToDoListController.delete)

module.exports = routes
