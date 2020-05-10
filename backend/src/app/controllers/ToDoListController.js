const ToDoList = require('../models/ToDoList')
// const checkToDoListOwner = require('../middlewares/checkToDoListOwner')

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
    await ToDoList.destroy({ where: { id: req.params.id } })

    return res.status(204).send()
  }
}
