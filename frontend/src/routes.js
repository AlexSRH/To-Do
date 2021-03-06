import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import NewToDoList from './pages/NewToDoList'
import ToDoList from './pages/ToDoList'

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Profile}/>
        <Route path='/register' component={Register}/>
        <Route path='/login'  component={Login} />
        <Route path='/to-do-lists/new'  component={NewToDoList} />
        <Route path='/to-do-lists/:id'  component={ToDoList} />
      </Switch>
    </BrowserRouter>
  )
}
