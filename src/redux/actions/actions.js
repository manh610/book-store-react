import { GETCURRENCY,
         EDITCURRENCY,
         BUY,
         CART, 
         LOVE,
         LOGIN, 
         LOGOUT, 
         REGISTER, 
         SETUSERS, 
         SETUSERS_FAILED, 
         SETUSERS_SUCCESS,
         RETRIVE,
         RETRIVE_FAILED,
         RETRIVE_SUCCESS} from './types'

export const buyAction = () => {
    return {
        type: BUY
    }
}

export const cartAction = () => {
    return {
        type: CART
    }
}

export const loginAction = (payload) => ({
    type: LOGIN, 
    payload,
})

export const logoutAction = () => ({    
    type: LOGOUT,
})

export const loveAction = () => {
    return {
        type: LOVE
    }
}

export const registerAction = (payload) => ({
    type: REGISTER,
    payload
})

export const retriveAction = () => ({
    type: RETRIVE,
})

export const setusersAction = () => ({
        type: SETUSERS,
})
export const setuserssuccessAction = (data) => ({
    type: SETUSERS_SUCCESS,
    payload:data
})
export const setusersfailedAction = (data) => ({
    type: SETUSERS_FAILED,
    payload: data
})
export const retrivesuccessAction = (data) =>({
    type: RETRIVE_SUCCESS,
    payload : data
})
export const retrivefailAction = (data) =>({
    type: RETRIVE_FAILED,
    payload : data
})
export const getCurrencyAction = () =>({
    type: GETCURRENCY,
})
export const editCurrencyAction = (data) =>({
    type: EDITCURRENCY,
    payload : data
})