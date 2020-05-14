const ToDoItem = require('../models/ToDoItem')
const ToDoList = require('../models/ToDoList')

module.exports = {
  async index (req, res) {
    const id = req.params.id
    const toDoList = await ToDoList.findOne({ where: { id } })
    const toDoItems = await ToDoItem.findAll({
      where: { to_do_list_id: id }
    })

    return res.json({ toDoList, toDoItems })
  },

  async edit (req, res) {
    const toDoChanges = req.body

    toDoChanges.forEach(async toDo => {
      if (toDo.id === 'new') {
        const checked = toDo.checked || false
        await ToDoItem.create({ 
          text: toDo.text,
          to_do_list_id: req.params.id,
          checked
        })
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
