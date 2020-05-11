import React from 'react'
import { FiLogIn } from 'react-icons/fi'
import { Link } from 'react-router-dom'

import './style.css'

export default function Login () {
  function handleLogin (e) {
    e.preventDefault()
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
            <input type="email" placeholder="E-mail"/>
            <input type="password" placeholder="Senha"/>
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
