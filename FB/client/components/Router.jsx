import React from 'react';
import {BrowserRouter,Route,Routes} from "react-router-dom"
import Login from './Login';
import Signup from './Signup'
import Home from './Home';
import ProtectedRoute from './ProtectedRoute';

const Router = () => {
  return (
   <BrowserRouter>
   <Routes>
    <Route path="/login" element={<Login/>}/>
    <Route path='/signup' element={<Signup/>}/>
    <Route path='/' element={<ProtectedRoute/>}>
    <Route path='/home' element={<Home/>}/>
    </Route>
   
    
   </Routes>
   </BrowserRouter>
  )
}

export default Router
