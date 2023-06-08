import axios from 'axios';

const PORT = 3008;
const URL_API = `http://localhost:${PORT}`

// book api
export const getBooksAPI = async(textSearch) => axios.get(`${URL_API}/book/getAll?name=${textSearch}`);

export const getBookByIdAPI = async(payload) => axios.post(`${URL_API}/book/getInfo`, payload);

export const createBookAPI = async(payload) => axios.post(`${URL_API}/book/create`, payload);

export const updateBookAPI = async(payload) => axios.post(`${URL_API}/book/update`, payload)

export const deleteBookAPI = async(payload) => axios.post(`${URL_API}/book/delete`, payload)




// user api
export const registerAPI = async(payload) => axios.post(`${URL_API}/user/register`, payload)

export const loginAPI = async(payload) => axios.post(`${URL_API}/user/login`, payload)




// book in cart
export const addToCartAPI = async(payload) => axios.post(`${URL_API}/bookbill/create`, payload)

export const removeFromCartAPI = async(payload) => axios.post(`${URL_API}/bookbill/delete`, payload)

export const getBookByUserAPI = async(payload) => axios.post(`${URL_API}/bookbill/user/cart`, payload)




// comment
export const createCommentAPI = async(payload) => axios.post(`${URL_API}/comment`, payload)

export const getCommentByBookAPI = async(payload) => axios.post(`${URL_API}/comment/book`, payload)

export const getCommentByUSerAPI = async(payload) => axios.post(`${URL_API}/comment/user`, payload)




// rate
export const createRateAPI = async(payload) => axios.post(`${URL_API}/rate`, payload)

export const getRateByBookAPI = async(payload) => axios.post(`${URL_API}/rate/book`, payload)

export const getRateByUSerAPI = async(payload) => axios.post(`${URL_API}/rate/user`, payload)




// category
export const getAllCategoryAPI = async() => axios.get(`${URL_API}/category/getAll`)




// bill
export const createBillAPI = async(payload) => axios.post(`${URL_API}/bill`, payload)

export const getBillByUserAPI = async(payload) => axios.post(`${URL_API}/bill/user`, payload)



