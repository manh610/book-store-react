import { GETCURRENCY , EDITCURRENCY } from "../actions/types";

const initialState ={
    all:['EGP LE','USD $'],
    current:"USD $"
}

const currency = ( state = initialState , {type , payload})=>{
    switch( type ){
        case GETCURRENCY:
            console.log(state);
            // state = payload;
            return state;
        case EDITCURRENCY:
            state = {...state,current:payload}
            console.log(state);
            return state;
        default:
            return state;    
    }
}

export default currency;