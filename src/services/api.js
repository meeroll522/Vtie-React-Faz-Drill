// src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';  // Your API base URL

export const fetchCountries = async () => {
    try {
      const response = await axios.get(`${API_URL}/countries`);
      console.log (response.data);  // Returning the data part of the response
      return response.data;
    } catch (error) {
      console.error('Error fetching countries:', error);
      throw error;  // Rethrow the error so it can be handled in the component
    }
  };
  
  // Fetch fields by country ID
  export const fetchFields = async (countryId) => {
    try {
      const response = await axios.get(`${API_URL}/fields?countryId=${countryId}`);
      return response.data;  // Returning the data part of the response
    } catch (error) {
      console.error('Error fetching fields:', error);
      throw error;  // Rethrow the error so it can be handled in the component
    }
  };
  
  // Fetch sites by field ID
  export const fetchSites = async (fieldId) => {
    try {
      const response = await axios.get(`${API_URL}/sites?fieldId=${fieldId}`);
      return response.data;  // Returning the data part of the response
    } catch (error) {
      console.error('Error fetching sites:', error);
      throw error;  // Rethrow the error so it can be handled in the component
    }
  };
  
  // Fetch wells by site ID
  export const fetchWells = async (siteId) => {
    try {
      const response = await axios.get(`${API_URL}/wells?siteId=${siteId}`);
      return response.data;  // Returning the data part of the response
    } catch (error) {
      console.error('Error fetching wells:', error);
      throw error;  // Rethrow the error so it can be handled in the component
    }
  };
  
  // Fetch wellbores by well ID
  export const fetchWellbores = async (wellId) => {
    try {
      const response = await axios.get(`${API_URL}/wellbores?wellId=${wellId}`);
      return response.data;  // Returning the data part of the response
    } catch (error) {
      console.error('Error fetching wellbores:', error);
      throw error;  // Rethrow the error so it can be handled in the component
    }
    
  };