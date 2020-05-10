const ToDoList = require('../models/ToDoList')
const checkToDoListOwner = require('../utils/checkToDoListOwner')

module.exports = {
  async index (req, res) {
    const userId = req.userId

    const toDoLists = await ToDoList.findAll({
      where: { user_id: userId }
    })

    return res.json(toDoLists)
  },

  async store (req, res) {
    const userId = req.userId
    const name = req.body.name

    const toDoList = await ToDoList.create({
      name,
      user_id: userId
    })

    return res.json(toDoList)
  },

  async delete (req, res) {
    const id = req.params.id

    if (!await checkToDoListOwner(req.userId, id)) {
      return res.status(401).send()
    }

    ToDoList.destroy({ where: { id } })

    return res.send()
  }
}
