// src/context/AuthContext.jsx
import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Function to log in
  const login = async (credentials) => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        const result = await response.json();
        setUser(result.user);  // Set user data after successful login
        navigate('/dashboard');  // Redirect to dashboard
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  // Function to log out
  const logout = () => {
    setUser(null);
    navigate('/');  // Redirect to login page
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
