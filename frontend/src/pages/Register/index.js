import React, { useEffect } from 'react'

import './style.css'
import BackButton from '../../components/BackButton'

export default function Register () {
  useEffect(() => { document.title = 'To Do System - Register' }, [])

  return (
    <>
      <header>
        <h1>Registrar-se</h1>
        <BackButton to='/login' />
      </header>
      <main>
        <div className="box">
          <h2>Nova conta</h2>
          <form>
            <input type="text" placeholder="Nome"/>
            <input type="text" placeholder="E-mail"/>
            <input type="password" placeholder="Senha"/>
            <button type="submit" className="login">Criar Conta</button>
          </form>
        </div>
      </main>
    </>
  )
}
