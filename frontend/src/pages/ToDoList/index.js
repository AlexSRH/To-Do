import React, { useState } from 'react'
import { FiX } from 'react-icons/fi'

import BackButton from '../../components/BackButton'
import ToggleButton from '../../components/ToggleButon'

import './style.css'

export default function ToDoList() {
  const [ toDos, setToDos ] = useState({})

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

  function test(event) {
    event.preventDefault()
    console.log(toDos)
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
                Object.keys(toDos).map(toDoId => {
                  if (toDos[toDoId].delete) {
                    return ''
                  }
                  return (
                    <li className='to-do' key={toDoId}>
                      <input
                        type="checkbox"
                        id={toDoId}
                        defaultChecked={toDos[toDoId].checked}
                        onChange={handleCheck}
                      />
                      <label for={toDoId}>
                        <ToggleButton checked={toDos[toDoId].checked}/>
                      </label>
                      <input
                        type="text"
                        placeholder='Digite um novo To Do...'
                        name='text'
                        id={toDoId}
                        defaultValue={toDos[toDoId].text}
                        autoComplete="off"
                        onChange={handleChangeText}
                      />
                      <button onClick={(event) => handleDeleteToDo(event, toDoId)}>
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
            <button type='submit' onClick={test}>Salvar</button>
          </form>
        </div>
      </main>
    </>
  )
}
