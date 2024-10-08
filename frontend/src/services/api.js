import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:2000/api',  // Backend base URL
});

export const fetchMenus = () => api.get('/menus');
export const fetchMenuById = (id) => api.get(`/menus/${id}`);
export const addMenuItem = (data) => api.post('/menus', data);
export const updateMenuItem = (id, data) => api.put(`/menus/${id}`, data);
export const deleteMenuItem = (id) => api.delete(`/menus/${id}`);
