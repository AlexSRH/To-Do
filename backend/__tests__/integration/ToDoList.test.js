const request = require('supertest')

const app = require('../../src/app')
const factory = require('../utils/factories')
const truncate = require('../utils/truncate')

beforeEach(truncate)

describe('To Do List Controller', () => {
  it('should receive all to do lists', async () => {
    const user = await factory.create('User')
    const token = await user.generateToken()

    await factory.create('ToDoList', {
      user_id: user.id,
      name: 'Tarefas de casa'
    })
    await factory.create('ToDoList', {
      user_id: user.id,
      name: 'Tarefas de classe'
    })

    const response = await request(app)
      .get('/to-do-lists')
      .set({ Authorization: `Bearer ${token}` })

    const toDoLists = response.body

    expect(response.status).toBe(200)
    expect(toDoLists[0].name).toBe('Tarefas de casa')
    expect(toDoLists[1].name).toBe('Tarefas de classe')
  })
})
