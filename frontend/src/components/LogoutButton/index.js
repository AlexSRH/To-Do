import React from 'react'
import { Link } from 'react-router-dom'
import { FiLogOut } from 'react-icons/fi'

export default function BackButton () {
  return (
    <Link className='back-button' to='/login'>
      <FiLogOut size={24} color="#F6F6F6"/>
    </Link>
  )
}
