// src/App.jsx
import { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import Login from './components/Login';
import Dashboard from './components/Dashboard';  // Create this next

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
      <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/" />} />
      {/* Add more routes as needed */}
    </Routes>
  );
}

export default App;
