import { useContext, useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import DrillReport from './components/DrillReport';
import { fetchCountries } from './services/api'; // Import fetchCountries function

function App() {
  const { user } = useContext(AuthContext);
  const [countries, setCountries] = useState([]); // Store list of countries
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const loadCountries = async () => {
      setLoading(true);
      try {
        const response = await fetchCountries(); // Fetch countries
        // Check if response data is an array and set it in state
        setCountries(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        setError('Error fetching countries');
      } finally {
        setLoading(false);
      }
    };
    loadCountries(); // Load countries when the component mounts
  }, []); // Empty dependency array to load only once

  return (
    <>
      {loading ? (
         <div>
         {loading && <p>Loading...</p>}
         {error && <p>{error}</p>}
         <DrillReport countries={countries} />  {/* Pass countries as a prop */}
       </div>// Show loading message while fetching
      ) : (
        <Routes>
          <Route path="/" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/" />} />
          <Route
            path="/daily-drilling-report"
            element={user ? <DrillReport countries={countries} /> : <Navigate to="/" />} // Pass countries to DrillReport
          />
        </Routes>
      )}
    </>
  );
}

export default App;
