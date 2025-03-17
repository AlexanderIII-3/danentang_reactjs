
import {
    HANDLE_LOGIN_COMPLETE, HANDLE_LOGOUT_COMPLETE,
    HANDLE_FETCH_ALL_DOCTOR, HANDLE_FETCH_ALL_DOCTOR_FALL
} from '../action/userAction';
const INITIAL_STATE = {
    account: {
        email: '',
        firstName: '',
        lastName: '',
        roleId: '',
    },
    isLogin: false,
    doctorArr: []
};
const handleLoginReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case HANDLE_LOGIN_COMPLETE:
            let data = action.payload.DT
            return {
                ...state, account: {
                    email: data.email,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    roleId: data.roleId
                },
                isLogin: true,
            };
        case HANDLE_LOGOUT_COMPLETE:
            return {
                ...state, account: {
                    email: '',
                    firstName: '',
                    lastName: '',
                    roleId: ''
                },
                isLogin: false,
            };


        case HANDLE_FETCH_ALL_DOCTOR: {
            return {
                ...state, doctorArr: action.payload.DT
            }
        }
        default: return state;
    }
};

export default handleLoginReducer;