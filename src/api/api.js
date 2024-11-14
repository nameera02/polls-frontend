import axios from 'axios';

const API_URL = 'http://localhost:4000/api/v1';
export const deletePoll = async (pollId) => {
  try {
    const response = await axios.delete(`${API_URL}/poll/${pollId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting poll:", error);
    throw error;
  }
};