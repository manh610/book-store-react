import { combineReducers } from "redux";
import myusers from './reducers/usersReducer';
import mybooks from './reducers/booksReducer';
import myloggedInUser from './reducers/loggedInUserReducer';
import currency from "./reducers/currencyReducer";

const rootReducer = combineReducers({
    usersroot : myusers,
    booksroot : mybooks,
    loggedInUserroot : myloggedInUser,  
    currencyroot : currency,
});

export default rootReducer; 