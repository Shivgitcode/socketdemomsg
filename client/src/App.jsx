
import { useEffect, useMemo, useState } from 'react'
import './App.css'
import io from "socket.io-client"
import { Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'
import Home from './pages/Home'
import Chat from './pages/Chat'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home></Home>}></Route>
      <Route path='/room/:id' element={<Chat></Chat>}></Route>
    </Routes>

  )





}

export default App
