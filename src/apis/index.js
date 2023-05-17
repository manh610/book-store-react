import axios from 'axios';

export const getBooksAPI = axios.get(`http://localhost:4000/books`);
export const getBookByIdAPI = async(id) => axios.get(`http://localhost:4000/books/${id}`);


export const createUserAPI = async (user) => axios.post(`http://localhost:4000/users` , user);

export const getUsersAPI = axios.get(`http://localhost:4000/users`);

export const updateUserAPI = async(user) => axios.put(`http://localhost:4000/users/${user.id}` , user);
