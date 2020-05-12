import React from 'react'

import BackButton from '../../components/BackButton'

export default function NewToDoList () {
  return (
    <>
      <header>
        <h1>Nova lista de To Dos</h1>
        <BackButton to='/'/>
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
