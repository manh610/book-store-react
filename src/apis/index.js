import axios from 'axios';

// R
export const getBooksAPI = axios.get(`http://localhost:4000/books`);
export const getBookByIdAPI = async(id) => axios.get(`http://localhost:4000/books/${id}`);


// C
export const createUserAPI = async (user) => axios.post(`http://localhost:4000/users` , user);

// R
export const getUsersAPI = axios.get(`http://localhost:4000/users`);

// U
export const updateUserAPI = async(user) => axios.put(`http://localhost:4000/users/${user.id}` , user);
