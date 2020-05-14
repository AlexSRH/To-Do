import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { FiX } from 'react-icons/fi'

import BackButton from '../../components/BackButton'
import ToggleButton from '../../components/ToggleButon'
import api from '../../services/api'

import './style.css'

export default function ToDoList() {
  const { id } = useParams()
  const history = useHistory()
  const token = localStorage.getItem('token')
  const [ toDos, setToDos ] = useState({})
  const [ changes, setChanges ] = useState({})
  const [ toDoListName, setToDoListName ] = useState('Carregando...')
  useEffect(() => { document.title = `To Do System - ${toDoListName}` }, [toDoListName])

  useEffect(() => {
    api.get(`/to-do-lists/${id}`, { headers: {'Authorization': token } })
      .then(res => {
        setToDoListName(res.data.toDoList.name)
        const newToDos = res.data.toDoItems.reduce((toDos, currentToDo) => {
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
    const checked = event.target.checked

    await setToDos({...toDos, [id]: {...toDos[id], checked }})
    await setChanges({...changes, [id]: {...changes[id], id, checked }})
  }

  async function handleChangeText(event) {
    const id = event.target.id
    const text = event.target.value

    await setToDos({...toDos, [id]: {...toDos[id], text }})
    await setChanges({...changes, [id]: {...changes[id], id, text }})
  }

  async function handleAddToDo(event) {
    const time = Date.now()
    const text = event.target.value
    const id = `new ${time}`
    await setToDos({...toDos, [id]: {id, text, checked: false}})
    await setChanges({...changes, [id]: {id, text, checked: false}})
    const toDoElements = document.getElementsByClassName('to-do')

    const [, input] = toDoElements[toDoElements.length - 2].getElementsByTagName('input')
    const [lastInput] = toDoElements[toDoElements.length - 1].getElementsByTagName('input')

    lastInput.value = ''
    input.focus()
  }

  async function handleDeleteToDo(event, id) {
    event.preventDefault()

    await setToDos({...toDos, [id]: {...toDos[id], delete: true}})

    if (changes[id] && /(new)/.test(changes[id].id)) {
      const newChanges = changes

      delete newChanges[id]
      await setChanges(newChanges)
    } else {
      setChanges({...changes, [id]: {id, delete: true }})
    }
  }

  async function handleSaveToDos (event) {
    event.preventDefault()
    const data = Object.values(changes).map(change => {
      if (/(new)/.test(change.id)) {
        change.id = 'new'
        return change
      } else {
        return change
      }
    })

    api.patch(`/to-do-lists/${id}`, data, {
      headers: { 'Authorization': token }
    }).then(history.push('/'))
  }

  return (
    <>
      <header>
        <h1>{toDoListName}</h1>
        <BackButton to='/' />
      </header>
      <main>
        <div className="to-do-list">
          <form onSubmit={handleSaveToDos}>
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
                      <button onClick={(event) => handleDeleteToDo(event, toDo.id)}>
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
