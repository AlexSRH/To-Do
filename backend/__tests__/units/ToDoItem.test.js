const factory = require('../utils/factories')

describe('To Do model', () => {
  it('should create a ToDo item', async () => {
    const user = await factory.create('User')
    const ToDoList = await factory.create('ToDoList', {
      user_id: user.id
    })
    const toDoItem = await factory.create('ToDoItem', {
      text: 'Tarefa de Matemática',
      to_do_list_id: ToDoList.id
    })

    expect(toDoItem.text).toBe('Tarefa de Matemática')
  })
})
