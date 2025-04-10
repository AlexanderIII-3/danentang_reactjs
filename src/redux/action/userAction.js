import { type } from '@testing-library/user-event/dist/type';
import { FetchAllDoctor, fetchAllDoctor, FetchAllCodes, handleFetchAllClinic, handleFetchALlSpecialtyService } from '../../services/userService'

export const HANDLE_LOGIN_COMPLETE = 'HANDLE_LOGIN_COMPLETE';
export const HANDLE_LOGOUT_COMPLETE = 'HANDLE_LOGOUT_COMPLETE'
export const HANDLE_FETCH_ALL_DOCTOR = 'HANDLE_FETCH_ALL_DOCTOR';
export const HANDLE_FETCH_ALL_DOCTOR_FALL = 'HANDLE_FETCH_ALL_DOCTOR_FALL';
export const HANDLE_FETCH_REQUIRED_DOCTOR = 'HANDLE_FETCH_REQUIRED_DOCTOR';
export const FETCH_ALL_ALLCODE_SCHEDULE_TIME_SUCCESS = 'FETCH_ALL_ALLCODE_SCHEDULE_TIME_SUCCESS'
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



export const handleFetchRequiredDoctor = () => {
    return async (dispatch, getState) => {
        try {
            const resPrice = await FetchAllCodes('PRICE')
            const resPayment = await FetchAllCodes('PAYMENT')
            const resProvince = await FetchAllCodes('PROVINCE')
            const resClinic = await handleFetchAllClinic()
            const resSpecialty = await handleFetchALlSpecialtyService()

            if (resPrice && resPrice.EC === 0
                && resPayment && resPayment.EC === 0
                && resProvince && resProvince.EC === 0
                && resClinic && resClinic.EC === 0
                && resSpecialty && resSpecialty.EC === 0
            ) {
                let data = {
                    resPrice: resPrice.DT,
                    resPayment: resPayment.DT,
                    resProvince: resProvince.DT,
                    resClinic: resClinic.DT,
                    resSpecialty: resSpecialty.DT
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

export const fetchAllDoctorStart = () => {


    return async (dispatch, getState) => {

        const resDoctor = await fetchAllDoctor();

        if (resDoctor && resDoctor.EC === 0) {

            let data = resDoctor.DT

            dispatch({
                payload: data,
                type: HANDLE_FETCH_ALL_DOCTOR
            })
        }
    }
}
export const fetchAllScheduleTime = () => {
    return async (dispatch, getState) => {

        try {
            let res = await FetchAllCodes('TIME')
            if (res && res.EC === 0) {
                dispatch({
                    payload: res.DT,
                    type: FETCH_ALL_ALLCODE_SCHEDULE_TIME_SUCCESS
                })
            }
        } catch (error) {
            console.log(error)
        }

    }

}

