/**
 * API service for connecting to Xenia backend
 */
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

/**
 * Analyze YouTube video comments
 */
export const analyzeVideo = async (videoUrl, maxComments = 100) => {
  try {
    const response = await axios.post(`${API_URL}/analyze`, {
      video_url: videoUrl,
      max_comments: maxComments
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.detail || 'Analysis failed');
    } else if (error.request) {
      throw new Error('Cannot connect to server. Make sure backend is running on port 8000.');
    } else {
      throw new Error('Request failed: ' + error.message);
    }
  }
};

/**
 * Check API health
 */
export const checkHealth = async () => {
  try {
    const response = await axios.get(`${API_URL}/health`);
    return response.data;
  } catch (error) {
    throw new Error('Backend is not responding');
  }
};