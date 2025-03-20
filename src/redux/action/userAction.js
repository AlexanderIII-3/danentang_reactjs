import { type } from '@testing-library/user-event/dist/type';
import { FetchAllDoctor, FetchAllCodes } from '../../services/userService'

export const HANDLE_LOGIN_COMPLETE = 'HANDLE_LOGIN_COMPLETE';
export const HANDLE_LOGOUT_COMPLETE = 'HANDLE_LOGOUT_COMPLETE'
export const HANDLE_FETCH_ALL_DOCTOR = 'HANDLE_FETCH_ALL_DOCTOR';
export const HANDLE_FETCH_ALL_DOCTOR_FALL = 'HANDLE_FETCH_ALL_DOCTOR_FALL';
export const HANDLE_FETCH_REQUIRED_DOCTOR = 'HANDLE_FETCH_REQUIRED_DOCTOR'
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
    return async (dispatch, getState) => {
        try {
            const resPrice = await FetchAllCodes('PRICE')
            const resPayment = await FetchAllCodes('PAYMENT')
            const resProvince = await FetchAllCodes('PROVINCE')
            if (resPrice && resPrice.EC === 0
                && resPayment && resPayment.EC === 0
                && resProvince && resProvince.EC === 0
            ) {
                let data = {
                    resPrice: resPrice.DT,
                    resPayment: resPayment.DT,
                    resProvince: resProvince.DT
                }
                dispatch({
                    type: HANDLE_FETCH_REQUIRED_DOCTOR,
                    payload: data
                })
            }
        } catch (error) {
            console.log(error)
        }
    }




};
export const fetchRequiredDoctorInforSuccess = (data) => {
    return {
        type: HANDLE_FETCH_REQUIRED_DOCTOR,
        payload: data
    }

}

