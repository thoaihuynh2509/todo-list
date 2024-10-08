import axios from 'axios';
import { TodoResponse } from '../types/todo';

const API_URL = 'http://localhost:3001';
const service = {
  getTodos: () =>
    axios.get(`${API_URL}/tasks`).then((response) => response.data),
  createTodo: (todo: TodoResponse) =>
    axios.post(`${API_URL}/tasks`, todo).then((response) => response.data),
  deleteTodo: (id: string) =>
    axios.delete(`${API_URL}/tasks/${id}`).then((response) => response.data),
  updateTodo: (id: string, data: TodoResponse) =>
    axios.put(`${API_URL}/tasks/${id}`, data).then((response) => response.data),
};

export default service;
