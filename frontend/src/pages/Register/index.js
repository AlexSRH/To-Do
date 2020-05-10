import React, { useEffect } from 'react'

import { FiArrowLeft } from 'react-icons/fi'

import { Link } from 'react-router-dom'

import './style.css'

export default function Register () {
  useEffect(() => { document.title = 'To Do System - Register' }, [])

  return (
    <>
      <header>
        <h1>Registrar-se</h1>
        <Link className='back-button' to='/'>
          <FiArrowLeft size={24} color="#F6F6F6"/>
        </Link>
      </header>
      <main>
        <div className="box">
          <h1>Nova conta</h1>
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
