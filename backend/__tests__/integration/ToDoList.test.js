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

  it('should create a to do list', async () => {
    const user = await factory.create('User')
    const token = await user.generateToken()

    const response = await request(app)
      .post('/to-do-lists')
      .set({ Authorization: `Bearer ${token}` })
      .send({ name: 'Tarefas da escola' })

    expect(response.status).toBe(200)
    expect(response.body.name).toBe('Tarefas da escola')
  })

  it('should delete my to do list', async () => {
    const user = await factory.create('User')
    const toDoList = await factory.create('ToDoList', { user_id: user.id })

    const token = await user.generateToken()

    const response = await request(app)
      .delete(`/to-do-lists/${toDoList.id}`)
      .set({ Authorization: `Bearer ${token}` })

    expect(response.status).toBe(204)
  })

  it('should not delete from others to do list', async () => {
    const user = await factory.create('User', { email: 'alex@gmail.com' })
    const user2 = await factory.create('User', { email: 'alex2@gmail.com' })
    const toDoList = await factory.create('ToDoList', { user_id: user.id })

    const token = await user2.generateToken()

    const response = await request(app)
      .delete(`/to-do-lists/${toDoList.id}`)
      .set({ Authorization: `Bearer ${token}` })

    expect(response.status).toBe(401)
  })
})
