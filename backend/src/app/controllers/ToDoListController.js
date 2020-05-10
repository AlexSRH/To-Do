const ToDoList = require('../models/ToDoList')

module.exports = {
  async index (req, res) {
    const userId = req.userId

    const toDoLists = await ToDoList.findAll({
      where: { user_id: userId }
    })

    return res.json(toDoLists)
  }
}
