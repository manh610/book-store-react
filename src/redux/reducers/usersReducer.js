import { REGISTER, SETUSERS, SETUSERS_SUCCESS , SETUSERS_FAILED , BUY , CART , LOVE } from "../actions/types";

const initialState={
    isLoading:false,
    users:[{
            id:"",
            username:"",
            email:"",
            password:"",
            loved:[],
            bought:[],
            cart:[]
        },
    ],       
    error:null
}


const myusers = ( state = initialState , {type,payload} )=>{
    switch( type ){
        case REGISTER:
            console.log("registered successfuly");
            state.users.push(payload);
            return state;
        case SETUSERS:
            return{...state,isLoading:true}    
        case SETUSERS_SUCCESS:
            return {
                  ...state,
                  users:payload,
                  isLoading: false,
            };
        case SETUSERS_FAILED:
            return {
                  ...state,
                  error:payload,
                  isLoading: false,
            };
        case LOVE:
            return{
                ...state,
                users:payload,
                isLoading:false
            }  
        case BUY:
            return{
                ...state,
                users:payload,
                isLoading:false
            }  
        case CART:
            return{
                ...state,
                users:payload,
                isLoading:false
            }    
        default:
            return state;    
    }
}

export default myusers;