import React, { useEffect, useState } from 'react';

const CountryDisplay = () => {
  const [country, setCountry] = useState(null); // To store the country data
  const [loading, setLoading] = useState(true); // To track loading state
  const [error, setError] = useState(null); // To store any error that occurs

  useEffect(() => {
    // Fetch data from the API when the component mounts
    fetch('/api/countries')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch country data');
        }
        return response.json();
      })
      .then((data) => {
        setCountry(data); // Set the country data
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        setError(error.message); // Set error if there is an issue with the request
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {country ? (
        <h3>Country: {country.country_name}</h3> // Display the country name
      ) : (
        <p>No country found</p>
      )}
    </div>
  );
};

export default CountryDisplay;
