import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HomePage from './Components/homePage.js';
import AddMovie from './Components/addMovie.js';
import { Routes, Route } from 'react-router-dom'


const App = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/addMovie' element={<AddMovie />} />
    </Routes>
  )
}

export default App