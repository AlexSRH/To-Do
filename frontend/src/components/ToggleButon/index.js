import React from 'react'
import { FiSquare, FiCheckSquare } from 'react-icons/fi'

export default function ToggleButon ({ checked, size }) {
  if (checked) {
    return <FiCheckSquare color='#aaaaaa' size={size}/>
  } else {
    return <FiSquare color='#aaaaaa' size={size}/>
  }
}
