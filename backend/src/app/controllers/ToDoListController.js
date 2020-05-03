const ToDoList = require('../models/ToDoList')

module.exports = {
  async index (req, res) {
    return res.send()
  },

  async store (req, res) {
    const user_id = req.user_id
    const { name } = req.body

    const toDoList = await ToDoList.create({
      user_id,
      name
    })

    return res.json(toDoList)
  }
}
