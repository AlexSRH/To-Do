import React from 'react'
import { Link } from 'react-router-dom'
import { FiTrash2, FiPlus } from 'react-icons/fi'

import LogoutButton from '../../components/LogoutButton'
import './style.css'

export default function Profile () {
  return (
    <>
      <header>
        <h1>Bem Vindo, Alex!</h1>
        <LogoutButton />
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
        <Link className='new-to-do-list' to='/new-to-do-list'>
          <FiPlus size={32} color='f3f3f3' />
        </Link>
      </main>
    </>
  )
}
