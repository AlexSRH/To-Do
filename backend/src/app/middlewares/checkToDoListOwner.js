const ToDoList = require('../models/ToDoList')

module.exports = async (req, res, next) => {
  const toDoList = await ToDoList.findByPk(req.params.id)

  if (toDoList.user_id !== req.userId) {
    return res.status(401).send()
  }

  next()
}
