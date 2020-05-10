const ToDoItem = require('../models/ToDoItem')

module.exports = {
  async index (req, res) {
    const toDoItems = await ToDoItem.findAll({
      where: { to_do_list_id: req.params.id }
    })

    return res.json(toDoItems)
  },

  async edit (req, res) {
    const toDoChanges = req.body

    toDoChanges.forEach(async toDo => {
      if (toDo.id === 'new') {
        await ToDoItem.create({ text: toDo.text, to_do_list_id: req.params.id })
      } else if (toDo.delete) {
        await ToDoItem.destroy({ where: { id: toDo.id } })
      } else {
        await ToDoItem.update(
          {
            text: toDo.text, checked: toDo.checked
          },
          {
            where: { id: toDo.id }
          }
        )
      }
    })

    return res.status(204).send()
  }
}
