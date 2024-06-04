import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, HashRouter, Navigate } from "react-router-dom";
import './App.css';

import { AuthProvider } from './Components/Auth/AuthContext';
import ProtectedRoute from './ProtectedRoute';
import Userinput from './Components/User/Userinput';
import Searchuser from './Components/User/Searchuser';
import Register from './Components/User/Register';
import Login from './Components/Login';
import Home from './Components/User/Home';
import ViewAll from './Components/User/Viewall';
import ForgotPassword from './Components/ForgotPassword';
import ResetPassword from './Components/ResetPassword';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  return (
    <>
      <HashRouter>
        <Routes>
        <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          
       
          <Route 
            path="/upload" 
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Userinput />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/search" 
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Searchuser />
              </ProtectedRoute>
            } 
          />
         
          <Route 
            path="/viewall" 
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <ViewAll />
              </ProtectedRoute>
            } 
          />
          
          <Route path="*" element={<Navigate to={isLoggedIn ? "/home" : "/login"} />} />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
