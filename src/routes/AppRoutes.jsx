import React from 'react'
import { Routes, Route } from "react-router-dom";
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Dashboard from '../pages/Dashboard';
import Client from '../pages/ClientPage';
import Project from '../pages/ProjectPage';
import EditPage from '../pages/EditPage';
import DetailPage from '../pages/DetailPage';

const AppRoutes = () => {
  return (
    <div>
      <Routes>
         <Route path='/' exact element={<SignIn/>}/>
         <Route path='/signup' exact element={<SignUp/>}/>
         <Route path='/dashboard' exact element={<Dashboard/>}/>
         <Route path='/client' exact element={<Client/>}/>
         <Route path='/projects' exact element={<Project/>}/>
         <Route path='/project/:id/edit' exact element={<EditPage/>}/>
         <Route path='/project/:id/detail' exact element={<DetailPage/>}/>
      </Routes>
    </div>
  )
}

export default AppRoutes
