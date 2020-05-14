import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import './style.css'
import BackButton from '../../components/BackButton'

import api from '../../services/api'

export default function Register () {
  useEffect(() => { document.title = 'To Do System - Register' }, [])
  const history = useHistory()

  const [ name, setName ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')

  async function handleCreateUser (event) {
    event.preventDefault()

    const data = {
      name,
      email,
      password
    }

    try {
      const res = await api.post('/users', data)
      const token = res.data.token

      localStorage.setItem('token', `Bearer ${token}`)

      history.push('/')
    } catch (err) {
      alert('Ocorreu um erro ao registrar!')
    }
  }

  return (
    <>
      <header>
        <h1>Registrar-se</h1>
        <BackButton to='/login' />
      </header>
      <main>
        <div className="box">
          <h2>Nova conta</h2>
          <form onSubmit={handleCreateUser}>
            <input type="text" onChange={e => setName(e.target.value)} placeholder="Nome"/>
            <input type="text" onChange={e => setEmail(e.target.value)} placeholder="E-mail"/>
            <input type="password" onChange={e => setPassword(e.target.value)} placeholder="Senha"/>
            <button type="submit" className="login">Criar Conta</button>
          </form>
        </div>
      </main>
    </>
  )
}
