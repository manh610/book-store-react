import { LOGIN , LOGOUT } from "../actions/types";

const myloggedInUser = ( state = null , {type , payload})=>{
    switch( type ){
        case LOGIN:
            console.log("logged in successfuly");
            state = payload;
            return state;
        case LOGOUT:
            console.log("logged out successfuly");
            state = null;
            return state;  
        default:
            return state;    
    }
}

export default myloggedInUser;