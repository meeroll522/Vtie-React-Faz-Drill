import React, { useState, useEffect } from 'react';
import { fetchCountries, fetchFields, fetchSites, fetchWells, fetchWellbores } from '../services/api';
import Card from './ui/Card';
import Table from './ui/table/Table';  // Default import
import { TableHeader, TableRow, TableHead, TableBody, TableCell } from './ui/table/Table';  // Named imports
import '../styles/table.css';

const DrillReport = () => {
  const [countries, setCountries] = useState([]);
  const [fields, setFields] = useState([]);
  const [sites, setSites] = useState([]);
  const [wells, setWells] = useState([]);
  const [wellbores, setWellbores] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedField, setSelectedField] = useState(null);
  const [selectedSite, setSelectedSite] = useState(null);
  const [selectedWell, setSelectedWell] = useState(null);
  const [selectedWellbore, setSelectedWellbore] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Generic function to handle API fetch and state update
  const fetchData = async (fetchFunction, setFunction, resetFunctions = [], setLoading, setError) => {
    setLoading(true);
    try {
      const data = await fetchFunction();
      setFunction(data);
      resetFunctions.forEach(reset => reset([]));  // Clear dependent selections
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch countries on component mount
  useEffect(() => {
    fetchData(fetchCountries, setCountries, [], setLoading, setError);
  }, []);

  // Fetch fields based on selected country
  useEffect(() => {
    if (selectedCountry) {
      fetchData(() => fetchFields(selectedCountry), setFields, [setSites, setWells, setWellbores], setLoading, setError);
    }
  }, [selectedCountry]);

  // Fetch sites based on selected field
  useEffect(() => {
    if (selectedField) {
      fetchData(() => fetchSites(selectedField), setSites, [setWells, setWellbores], setLoading, setError);
    }
  }, [selectedField]);

  // Fetch wells based on selected site
  useEffect(() => {
    if (selectedSite) {
      fetchData(() => fetchWells(selectedSite), setWells, [setWellbores], setLoading, setError);
    }
  }, [selectedSite]);

  // Fetch wellbores based on selected well
  useEffect(() => {
    if (selectedWell) {
      fetchData(() => fetchWellbores(selectedWell), setWellbores, [], setLoading, setError);
    }
  }, [selectedWell]);

  // Handle selection changes and reset dependent selections
  const handleSelect = (id, setFunction, resetFunctions) => {
    setFunction(id);
    resetFunctions.forEach(reset => reset([])); // Clear dependent selections
  };

  // Generic table rendering for different data types (countries, fields, etc.)
  const renderTable = (data, headers, handleSelect, label) => (
    <Table className="mt-6">
      <TableHeader>
        <TableRow>
          {headers.map((header, idx) => (
            <TableHead key={idx}>{header}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.isArray(data) && data.map((item) => (
          <TableRow key={item[`${label}_id`]}>
            <TableCell>{item[`${label}_name`]}</TableCell>
            <TableCell>
              <button onClick={() => handleSelect(item[`${label}_id`], label)} className="btn btn-primary">
                Select
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <Card className="p-4">
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Country Selection */}
      <h2>Selected Country: {selectedCountry ? countries.find(c => c.country_id === selectedCountry)?.country_name : 'None'}</h2>
      {renderTable(countries, ['Country', 'Actions'], (id, label) => {
        setSelectedCountry(id);
        handleSelect(id, setSelectedCountry, [setFields, setSites, setWells, setWellbores]);
      }, 'country')}

      {/* Field Selection */}
      {selectedCountry && renderTable(fields, ['Field', 'Actions'], (id, label) => {
        setSelectedField(id);
        handleSelect(id, setSelectedField, [setSites, setWells, setWellbores]);
      }, 'field')}

      {/* Site Selection */}
      {selectedField && renderTable(sites, ['Site', 'Actions'], (id, label) => {
        setSelectedSite(id);
        handleSelect(id, setSelectedSite, [setWells, setWellbores]);
      }, 'site')}

      {/* Well Selection */}
      {selectedSite && renderTable(wells, ['Well', 'Actions'], (id, label) => {
        setSelectedWell(id);
        handleSelect(id, setSelectedWell, [setWellbores]);
      }, 'well')}

      {/* Wellbore Selection */}
      {selectedWell && renderTable(wellbores, ['Wellbore', 'Actions'], setSelectedWellbore, 'wellbore')}
    </Card>
  );
};

export default DrillReport;
