const routes = require('express').Router()

const UserController = require('./app/controllers/UserController')
const SessionController = require('./app/controllers/SessionController')
const ToDoListController = require('./app/controllers/ToDoListController')
const ToDoItemController = require('./app/controllers/ToDoItemController')

const authMiddleware = require('./app/middlewares/auth')
const checkToDoListOwnerMiddleware = require('./app/middlewares/checkToDoListOwner')

routes.post('/users', UserController.store)
routes.post('/sessions', SessionController.store)

routes.use(authMiddleware)

routes.get('/to-do-lists', ToDoListController.index)
routes.post('/to-do-lists', ToDoListController.store)

routes.use('/to-do-lists/:id', checkToDoListOwnerMiddleware)

routes.delete('/to-do-lists/:id', ToDoListController.delete)

routes.get('/to-do-lists/:id', ToDoItemController.index)
routes.patch('/to-do-lists/:id', ToDoItemController.edit)

module.exports = routes
