const request = require('supertest')

const app = require('../../src/app')
const factory = require('../utils/factories')
const truncate = require('../utils/truncate')

beforeEach(truncate)

describe('To Do Item Controller', () => {
  it('should receive a list of to dos', async () => {
    const user = await factory.create('User')
    const toDoList = await factory.create('ToDoList', { user_id: user.id })

    await factory.create('ToDoItem', {
      to_do_list_id: toDoList.id,
      text: 'Matemática',
      checked: false
    })
    await factory.create('ToDoItem', {
      to_do_list_id: toDoList.id,
      text: 'Física',
      checked: true
    })

    const token = await user.generateToken()

    const response = await request(app)
      .get(`/to-do-lists/${toDoList.id}`)
      .set({ Authorization: `Bearer ${token}` })

    const toDoItems = response.body

    expect(response.status).toBe(200)
    expect(toDoItems[0].text).toBe('Matemática')
    expect(toDoItems[1].text).toBe('Física')
  })

  it('should edit to do items', async () => {
    const user = await factory.create('User')
    const toDoList = await factory.create('ToDoList', { user_id: user.id })
    const token = await user.generateToken()

    await request(app)
      .patch(`/to-do-lists/${toDoList.id}`)
      .set({ Authorization: `Bearer ${token}` })
      .send([
        {
          id: 'new',
          text: 'Matemática',
          checked: false
        },
        {
          id: 'new',
          text: 'Física',
          checked: 'true'
        }
      ])

    const response = await request(app)
      .patch(`/to-do-lists/${toDoList.id}`)
      .set({ Authorization: `Bearer ${token}` })
      .send([
        {
          id: 1,
          checked: true
        },
        {
          id: 2,
          delete: true
        }
      ])

    expect(response.status).toBe(204)
  })
})
