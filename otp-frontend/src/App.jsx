import React from 'react'
import Login from './components/Otp-ui.jsx'

import { Routes , Route } from 'react-router-dom'
import Welcome from './components/Welcome'

const App = () => {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/welcome' element={<Welcome  />} />
      </Routes>

    </div>
  )
}

export default App
