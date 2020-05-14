import React, { useState } from 'react'
import { FiLogIn } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom'

import './style.css'
import api from '../../services/api'

export default function Login () {
  const history = useHistory()
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')

  async function handleLogin (e) {
    e.preventDefault()

    const data = { email, password }

    try {
      const res = await api.post('/sessions', data)
      const userName = res.data.user.name
      const token = res.data.token

      localStorage.setItem('token', `Bearer ${token}`)
      localStorage.setItem('userName', userName)
      history.push('/')
    } catch (err) {
      console.log(err)
      alert('Email ou Senha Inválidos')
    }
  }

  return (
    <>
      <header>
        <h1>To Do Lists System</h1>
      </header>
      <main>
        <div className="box">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <input type="email" onChange={e => setEmail(e.target.value)} placeholder="E-mail"/>
            <input type="password" onChange={e => setPassword(e.target.value)} placeholder="Senha"/>
            <button type="submit" className="login">
              Fazer Login&nbsp;
              <FiLogIn size={20} color="#000000" />
            </button>
          </form>

          <Link className="create-account" to='/register'>
            Não tenho uma conta
          </Link>
        </div>
      </main>
    </>
  )
}
