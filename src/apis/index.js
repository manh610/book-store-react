import axios from 'axios';

const PORT = 3009;
const URL_API = `http://localhost:${PORT}`

// book api
export const getBooksAPI = async() => axios.get(`${URL_API}/book/getAll`);

export const getBookByIdAPI = async(id) => axios.get(`${URL_API}/book/`, {id: id});

export const updateBookAPI = async(payload) => axios.post(`${URL_API}/book/update`, payload)

export const deleteBookAPI = async(payload) => axios.post(`${URL_API}/book/delete`, payload)




// user api
export const registerAPI = async(payload) => axios.post(`${URL_API}/user/register`, payload)

export const loginAPI = async(payload) => axios.post(`${URL_API}/user/login`, payload)




// book in cart
export const addToCartAPI = async(payload) => axios.post(`${URL_API}/bookbill/create`, payload)

export const removeFromCartAPI = async(id) => axios.delete(`${URL_API}/bookbill/delete/${id}`)

export const getBookByUserAPI = async(userId) => axios.get(`${URL_API}/bookbill/user/${userId}`)




// comment
export const createCommentAPI = async(payload) => axios.post(`${URL_API}/comment`, payload)

export const getCommentByBookAPI = async(bookId) => axios.get(`${URL_API}/comment/book/${bookId}`)

export const getCommentByUSerAPI = async(userId) => axios.get(`${URL_API}/comment/user/${userId}`)




// rate
export const createRateAPI = async(payload) => axios.post(`${URL_API}/rate`, payload)

export const getRateByBookAPI = async(bookId) => axios.get(`${URL_API}/rate/book/${bookId}`)

export const getRateByUSerAPI = async(userId) => axios.get(`${URL_API}/rate/user/${userId}`)