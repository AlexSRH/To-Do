import React from 'react'
import { Link } from 'react-router-dom'
import { FiLogOut, FiTrash2, FiPlus } from 'react-icons/fi'

import './style.css'

export default function Profile () {
  return (
    <>
      <header>
        <h1>Bem Vindo, Alex!</h1>
        <Link className='back-button' to='/'>
          <FiLogOut size={24} color="#F6F6F6"/>
        </Link>
      </header>
      <main>
        <ul className='to-do-lists'>
          <li>
            <Link>Tarefas de Casa</Link>
            <button className='trash'>
              <FiTrash2 size={32} color='f3f3f3'/>
            </button>
          </li>
        </ul>
        <button className='new-to-do-list'>
          <FiPlus size={36} color='f3f3f3' />
        </button>
      </main>
    </>
  )
}
