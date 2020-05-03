const request = require('supertest')

require('../../src/database')
const ToDoList = require('../../src/app/models/ToDoList')
const app = require('../../src/app')
const factory = require('../factories')
const truncate = require('../utils/truncate')

beforeAll(async () => {
  await truncate()
  user = await factory.create('User')
})

describe('To Do List ', () => {
  it('should create a to do list', async () => {
    const response = await request(app)
      .post(`/${user.id}/to-do-lists`)
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send({ name: 'Tarefas da escola' })

    const toDoList = await ToDoList.findOne({ where: { id: response.body.id} })

    expect(toDoList.name).toBe('Tarefas da escola')
  })
})
