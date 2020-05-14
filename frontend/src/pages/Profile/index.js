import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiTrash2, FiPlus } from 'react-icons/fi'

import LogoutButton from '../../components/LogoutButton'
import api from '../../services/api'
import './style.css'

export default function Profile () {
  const history = useHistory()
  const [ toDoLists, setToDoLists ] = useState([])
  const userName = localStorage.getItem('userName')
  const token = localStorage.getItem('token')

  useEffect(() => {
    if (!token) { history.push('/login') }

    api.get('/to-do-lists', { headers: {
      'Authorization': token
    }}).then(res => setToDoLists(res.data))
  }, [history, token])

  function handleDeleteToDoList (e, id) {
    e.preventDefault()

    api.delete(`/to-do-lists/${id}`, { headers: { 'Authorization': token } })
      .then(res => {
        const newToDoLists = toDoLists.filter(toDoList => toDoList.id !== id)
        setToDoLists(newToDoLists)
      })
  }

  return (
    <>
      <header>
        <h1>Bem Vindo, {userName}!</h1>
        <LogoutButton />
      </header>
      <main>
        <ul className='to-do-lists'>
          {
            toDoLists.map(toDoList => (
              <li key={toDoList.id}>
                <Link to={`/to-do-lists/${toDoList.id}`}>{toDoList.name}</Link>
                <button className='trash' onClick={e => handleDeleteToDoList(e, toDoList.id)}>
                  <FiTrash2 size={32} color='#f3f3f3'/>
                </button>
              </li>
            ))
          }
                  <Link className='new-to-do-list' to='/to-do-lists/new'>
          <FiPlus size={32} color='#f3f3f3' />
        </Link>
        </ul>

      </main>
    </>
  )
}
