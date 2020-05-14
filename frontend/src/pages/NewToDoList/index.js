import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import BackButton from '../../components/BackButton'
import api from '../../services/api'

export default function NewToDoList () {
  useEffect(() => {
    document.title = 'Nova Lista'
    document.getElementById('newToDoName').focus()
  }, [])
  const history = useHistory()
  const [ name, setName ] = useState()

  const token = localStorage.getItem('token')

  function handleCreateToDoLists (e) {
    e.preventDefault()

    api.post('/to-do-lists', { name }, { headers: { 'Authorization': token } })
      .then(res => setName(res.data))

    history.push('/')
  }

  return (
    <>
      <header>
        <h1>Nova lista de To Dos</h1>
        <BackButton to='/'/>
      </header>
      <main>
        <div className="box">
          <h2>Nome</h2>
          <form onSubmit={handleCreateToDoLists}>
            <input type="text" id='newToDoName' onChange={e => setName(e.target.value)} placeholder='Digite o nome da nova lista...'/>
            <button type="submit">Criar Lista</button>
          </form>
        </div>
      </main>
    </>
  )
}
