import React, { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import SignupPage from '../SignupPage/SignupPage';
import LoginPage from '../LoginPage/LoginPage';
import userService from '../../utils/userService';
import Home from '../Home/Home';
import Layout from "../Layout/Layout";


function App() {
  const [user, setUser] = useState(userService.getUser());
  function handleSignUpOrLogin(){
    setUser(userService.getUser());
  }

  function handleLogout() {
    userService.logout();
    setUser(null);
  }

  if (user) {
    return (
      <Routes>
        <Route
          path="/"
          element={<Layout user={user} handleLogout={handleLogout} />}
        >
          <Route index element={<Home user={user} />}></Route>
          <Route
            path="/login"
            element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin} />}
          />
          <Route path="/signup" element={<SignupPage handleSignUpOrLogin={handleSignUpOrLogin}/>} /> 
        </Route>
      </Routes>
    );
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin} />}
      />

      <Route path="/signup" element={<SignupPage handleSignUpOrLogin={handleSignUpOrLogin}/>} />
      <Route path="/*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
