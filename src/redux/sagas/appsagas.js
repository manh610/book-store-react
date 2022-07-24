import { takeEvery , put , takeLatest ,call} from 'redux-saga/effects';
import { BUY , CART , SETUSERS , LOVE , REGISTER , RETRIVE } from '../actions/types';
import { getBooksAPI ,  
         getUsersAPI , 
         createUserAPI } from '../../apis/index';
import { setusersfailedAction , setuserssuccessAction , retrivesuccessAction , retrivefailAction } from '../actions/actions';


function* onSetUsers() {
    try {
      const response = yield getUsersAPI;
      yield put(setuserssuccessAction(response.data));
    } catch (error) {
      yield put(setusersfailedAction(error.message));
    }
}

function* onRegisterAsync({payload}){
    try{
        yield call(createUserAPI(payload));
        yield put(REGISTER(payload));        
    }catch(error){
        console.log('registeration failed');
    }
}

function* onBookRetrive() {
    try {
      const response = yield getBooksAPI;
      yield put(retrivesuccessAction(response.data));
      console.log(response.data,'hena response.data in appsagas ');
    } catch (error) {
      yield put(retrivefailAction(error.message));
      console.log(error.message,'hena error.message in appsagas ');
    }
}

function* onBuy(){

}

function* onLove(){

}

function* onCart(){

}
export function* watchShopAsync() {
    yield takeEvery(SETUSERS, onSetUsers);   
    yield takeEvery(REGISTER, onRegisterAsync);
    yield takeLatest(RETRIVE, onBookRetrive);
    yield takeLatest(BUY, onBuy);
    yield takeLatest(LOVE, onLove);
    yield takeLatest(CART, onCart); 
}


