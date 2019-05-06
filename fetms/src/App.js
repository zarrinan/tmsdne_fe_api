import React from 'react'
import { Route } from 'react-router-dom'
import Home from './Home'
import Header from './Header'
import './App.css'


export default function App() {
  return (
    <div >
      <Header />
      <Route exact path='/' component={Home} />
    </div>
  )
}
