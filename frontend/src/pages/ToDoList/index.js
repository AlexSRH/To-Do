import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { FiX } from 'react-icons/fi'

import BackButton from '../../components/BackButton'
import ToggleButton from '../../components/ToggleButon'
import api from '../../services/api'

import './style.css'

export default function ToDoList() {
  const { id } = useParams()
  const token = localStorage.getItem('token')
  const [ toDos, setToDos ] = useState({})

  useEffect(() => {
    api.get(`/to-do-lists/${id}`, { headers: {'Authorization': token } })
      .then(res => {
        const newToDos = res.data.reduce((toDos, currentToDo) => {
          return (toDos = {
            ...toDos,
            [currentToDo.id]: {
              id: currentToDo.id,
              text: currentToDo.text,
              checked: currentToDo.checked
            }
          })
        }, {})
        setToDos(newToDos)
      })
  }, [id, token])

  async function handleCheck(event) {
    const id = event.target.id

    await setToDos({...toDos, [id]: {...toDos[id], checked: event.target.checked }})
  }

  async function handleChangeText(event) {
    const id = event.target.id

    await setToDos({...toDos, [id]: {...toDos[id], text: event.target.value }})
  }

  async function handleAddToDo(event) {
    const time = Date.now()
    const toDoName = `new ${time}`
    await setToDos({...toDos, [toDoName]: {text: event.target.value, checked: false}})
    const toDoElements = document.getElementsByClassName('to-do')

    const [, input] = toDoElements[toDoElements.length - 2].getElementsByTagName('input')
    const [lastInput] = toDoElements[toDoElements.length - 1].getElementsByTagName('input')

    lastInput.value = ''
    input.focus()
  }

  async function handleDeleteToDo(event, id) {
    event.preventDefault()

    await setToDos({...toDos, [id]: {...toDos[id], delete: true}})
  }

  return (
    <>
      <header>
        <h1>Tarefas de Casa</h1>
        <BackButton to='/' />
      </header>
      <main>
        <div className="to-do-list">
          <form>
            <ul className='to-dos'>
              {
                Object.values(toDos).map(toDo => {
                  if (toDo.delete) {
                    return ''
                  }
                  return (
                    <li className='to-do' key={toDo.id}>
                      <input
                        type="checkbox"
                        id={toDo.id}
                        defaultChecked={toDo.checked}
                        onChange={handleCheck}
                      />
                      <label htmlFor={toDo.id}>
                        <ToggleButton checked={toDo.checked}/>
                      </label>
                      <input
                        type="text"
                        placeholder='Digite um novo To Do...'
                        name='text'
                        id={toDo.id}
                        defaultValue={toDo.text}
                        autoComplete="off"
                        onChange={handleChangeText}
                      />
                      <button onClick={(event) => handleDeleteToDo(event, toDo)}>
                        <FiX size={16} color="#dddddd"/>
                      </button>
                    </li>
                  )
                })
              }
              <li className='to-do'>
                <input
                  type="text"
                  placeholder='Digite um novo To Do...'
                  id="new"
                  autoComplete="off"
                  onChange={handleAddToDo}
                />
              </li>
            </ul>
            <button type='submit'>Salvar</button>
          </form>
        </div>
      </main>
    </>
  )
}
