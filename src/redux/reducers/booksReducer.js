import { RETRIVE , RETRIVE_FAILED , RETRIVE_SUCCESS } from "../actions/types";

const initialState={
    isLoading:false,
    books:[{
            id:"",
            name:"",
            desc:"",
            img:"",
            price:[],
            inStock:false,
            new:false,
            discount:false,
            discountRate:0,
            text:true
        },
    ],       
    error:null
}
const mybooks= ( state = initialState , { type , payload } )=>{
    switch( type ){
            case RETRIVE:
                return{...state,isLoading:true}    
            case RETRIVE_SUCCESS:
                console.log('5eer isa');
                return {
                      ...state,
                      books:payload,
                      isLoading: false,
                };
            case RETRIVE_FAILED:
                return {
                      ...state,
                      error:payload,
                      isLoading: false,
                };
            default :
                return state;
    }
}

export default mybooks;