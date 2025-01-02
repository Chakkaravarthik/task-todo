import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import LoginForm from './auth/login';
import RegisterForm from './auth/register';
import TodoList from './components/Todolist';
import App from './App';

const App1 = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(localStorage.getItem('IsAuthenticated')));
  const [isAdmin, setIsAdmin] = useState(false);

  // Update authentication status if it changes in localStorage
  useEffect(() => {
    const checkAuth = () => setIsAuthenticated(Boolean(localStorage.getItem('IsAuthenticated')));
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  // Set admin status based on token
  useEffect(() => {
    const userToken = localStorage.getItem('UserToken');
    if (userToken) {
      const userDetails = jwtDecode(userToken);
      if (userDetails.role === 'admin') {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    } else {
      setIsAdmin(false);
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    localStorage.removeItem('IsAuthenticated');
    localStorage.removeItem('UserToken');
    setIsAuthenticated(false); 
    setIsAdmin(false); 
  };



  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginForm setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/register" element={<RegisterForm />} />
        {isAuthenticated ? (
          <Route
            path="*"
            element={
                  <Routes>
                     <Route path="todo" element={<App handleLogout={handleLogout}/>} />
                  </Routes>
            }
          />
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default App1;