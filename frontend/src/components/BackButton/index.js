import React from 'react'
import { Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

export default function BackButton ({ to }) {
  return (
    <Link className='back-button' to={to}>
      <FiArrowLeft size={24} color="#F6F6F6"/>
    </Link>
  )
}
