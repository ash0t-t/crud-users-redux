import axios from 'axios';

const API_URL = "http://localhost:3001/users";

export const getUsers = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addUser = async (user) => {
  const response = await axios.post(API_URL, user);
  return response.data;
};

export const updateUser = async (user) => {
  const response = await axios.put(`${API_URL}/${user.id}`, user);
  return response.data;
};

export const deleteUser = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};