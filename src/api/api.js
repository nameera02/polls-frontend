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
export const userLogin = async (email, password) => {
  try {
   const response =await axios.post(`${API_URL}/login`, { email, password });
   if (response.data.success) {
    return response.data;
  }
  throw new Error('Login failed');
} catch (error) {
  throw error; // You can handle this error further up if necessary
}
};
export const userRegister = async (name,email, password) => {
  try {
   const response =await axios.post(`${API_URL}/register`, { name,email, password });
   if (response.data.success) {
    return response.data;
  }
  throw new Error('Registrantion failed');
} catch (error) {
  throw error; // You can handle this error further up if necessary
}
};