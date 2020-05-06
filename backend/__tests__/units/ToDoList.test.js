const factory = require('../utils/factories')

describe('To Do List Model', () => {
  it('should create a to do list', async () => {
    const user = await factory.create('User')
    const toDoList = await factory.create('ToDoList', {
      user_id: user.id,
      name: 'Tarefa de Casa'
    })

    expect(toDoList.name).toBe('Tarefa de Casa')
  })
})
