import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import '../styles/Table.css';  // Ensure correct CSS import

function DrillReport() {
  const { user } = useContext(AuthContext);  // Retrieve user from context
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null);  // Track errors
  const [loading, setLoading] = useState(true);  // Track loading state

  useEffect(() => {
    if (user) {  // Only log user data when it is available
      console.log('User data:', user);
      
      if (user.company_id) {
        setLoading(true); // Ensure loading is true before making the fetch request
        fetch(`/api/getCountries?companyId=${user.company_id}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error(`Server error: ${response.statusText}`);
            }
            return response.json();
          })
          .then((data) => {
            setCountries(data);
            setLoading(false);  // Data fetched, stop loading
          })
          .catch((error) => {
            console.error('Error fetching countries:', error);
            setError('Failed to fetch country data.');
            setLoading(false);  // Stop loading if error occurs
          });
      } else {
        setError('Company ID is missing.');
        setLoading(false);  // Stop loading if company_id is missing
      }
    }
  }, [user]);  // Runs whenever 'user' changes

  if (loading) {
    return <p>Loading...</p>;  // Display loading message while fetching data
  }

  return (
    <div className="table-container">
      {error && <div className="error-message">{error}</div>}  {/* Display error */}

      {user ? (
        <table>
          <thead>
            <tr>
              <th>COUNTRY</th>
              <th>FIELD</th>
              <th>SITE</th>
              <th>WELL</th>
              <th>WELLBORE</th>
              <th>REPORT</th>
            </tr>
          </thead>
          <tbody>
            {countries.length > 0 ? (
              countries.map((country) => (
                <tr key={country.country_id}>
                  <td>{country.country_name}</td>
                  <td>{country.field_name}</td>
                  <td>{country.site_name}</td>
                  <td>{country.well_name}</td>
                  <td>{country.wellbore_name}</td>
                  <td>{country.report_name}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No countries found.</td>
              </tr>
            )}
          </tbody>
        </table>
      ) : (
        <p>User data is not available.</p>  
      )}
    </div>
  );
}

export default DrillReport;
