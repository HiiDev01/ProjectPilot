import React from 'react'
import { Routes, Route } from "react-router-dom";
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Dashboard from '../pages/Dashboard';

const AppRoutes = () => {
  return (
    <div>
      <Routes>
         <Route path='/' exact element={<SignIn/>}/>
         <Route path='/signup' exact element={<SignUp/>}/>
         <Route path='/dashboard' exact element={<Dashboard/>}/>
      </Routes>
    </div>
  )
}

export default AppRoutes
