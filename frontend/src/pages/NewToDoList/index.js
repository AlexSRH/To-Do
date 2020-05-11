import React from 'react'
import { Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

export default function NewToDoList () {
  return (
    <>
      <header>
        <h1>Nova lista de To Dos</h1>
        <Link className='back-button' to='/'>
          <FiArrowLeft size={24} color="#F6F6F6"/>
        </Link>
      </header>
      <main>
        <div className="box">
          <h2>Nome</h2>
          <form>
            <input type="text" placeholder='Digite o nome da nova lista...'/>
            <button type="submit">Criar Lista</button>
          </form>
        </div>
      </main>
    </>
  )
}
