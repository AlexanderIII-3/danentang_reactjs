import { combineReducers } from 'redux';
import counterReducer from './counterReducer';
import userReducer from './userReducer';
import doctorReducer from './doctorReducer';
const rootReducer = combineReducers({
    counter: counterReducer,
    userInfo: userReducer,
    doctor: doctorReducer
});

export default rootReducer;