import { combineReducers } from "redux";
import myusers from './reducers/usersReducer';
import mybooks from './reducers/booksReducer';
import myloggedInUser from './reducers/loggedInUserReducer';

const rootReducer = combineReducers({
    usersroot : myusers,
    booksroot : mybooks,
    loggedInUserroot : myloggedInUser,  
});

export default rootReducer; 