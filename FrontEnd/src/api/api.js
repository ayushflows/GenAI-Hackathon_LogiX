import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_APP_BACKEND_API;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Fetch distinct users based on the social account platform.
 * @param {string} socialAccount - The name of the social media platform.
 * @returns {Promise<Array>} - List of distinct users.
 */
export const fetchDistinctUsers = async (socialAccount) => {
  try {
    const response = await api.post( '/data/socialAccount', { socialAccount });
    return response.data.data; // Assuming `data` key contains the user list
  } catch (error) {
    console.error('Error fetching distinct users:', error);
    throw error;
  }
};

/**
 * Perform data analysis by fetching and processing data from the backend.
 * @param {Object} params - Parameters for data analysis.
 * @param {string} params.socialAccount - Social media platform name.
 * @param {string} params.user - User associated with the data.
 * @param {string} params.postType - Type of post to analyze.
 * @returns {Promise<Object>} - The result of the data analysis.
 */
export const analyzeData = async (params) => {
  try {
    const response = await api.post('/data/dataAnalysis', params);
    return response.data; // Assuming the backend returns the processed data as JSON
  } catch (error) {
    console.error('Error analyzing data:', error);
    throw error;
  }
};

/**
 * A demo function to hit the root route of the backend.
 * @returns {Promise<Object>} - The response from the backend.
 */
export const demoFetch = async () => {
  try {
    const response = await api.get('/data'); // Sending a GET request to the root route.
    return response.data; // Assuming the backend returns a JSON response.
  } catch (error) {
    console.error('Error with the demo fetch:', error);
    throw error;
  }
};
