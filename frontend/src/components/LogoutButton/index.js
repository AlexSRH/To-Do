import React from 'react'
import { FiLogOut } from 'react-icons/fi'
import { useHistory } from 'react-router-dom'

export default function BackButton () {
  const history = useHistory()

  async function handleLogOut () {
    localStorage.removeItem('token')
    history.push('/login')
  }

  return (
    <button onClick={handleLogOut} className='back-button'>
      <FiLogOut size={24} color="#F6F6F6"/>
    </button>
  )
}
