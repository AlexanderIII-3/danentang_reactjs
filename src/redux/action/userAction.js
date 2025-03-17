import { type } from '@testing-library/user-event/dist/type';
import { FetchAllDoctor } from '../../services/userService'

export const HANDLE_LOGIN_COMPLETE = 'HANDLE_LOGIN_COMPLETE';
export const HANDLE_LOGOUT_COMPLETE = 'HANDLE_LOGOUT_COMPLETE'
export const HANDLE_FETCH_ALL_DOCTOR = 'HANDLE_FETCH_ALL_DOCTOR';
export const HANDLE_FETCH_ALL_DOCTOR_FALL = 'HANDLE_FETCH_ALL_DOCTOR_FALL'
export const handleLoginRedux = (data) => {
    return {
        type: HANDLE_LOGIN_COMPLETE,
        payload: data
    };
};
export const handleLogOutRedux = () => {
    return {
        type: HANDLE_LOGOUT_COMPLETE,
    };
};



export const handleFetchAllDoctor = () => {

    // let doctors = await FetchAllDoctor();
    // if (doctors) {
    //     return {
    //         type: HANDLE_FETCH_ALL_DOCTOR,
    //         payload: doctors
    //     };
    // } else {
    //     return {
    //         type: HANDLE_FETCH_ALL_DOCTOR_FALL,

    //     };
    // }



};

