const ToDoList = require('../models/ToDoList')

module.exports = async (userId, toDoListId) => {
  const toDoList = await ToDoList.findByPk(toDoListId)

  return userId === toDoList.user_id
}
