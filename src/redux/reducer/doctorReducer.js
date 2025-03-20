
import {

    HANDLE_FETCH_ALL_DOCTOR, HANDLE_FETCH_ALL_DOCTOR_FALL, HANDLE_FETCH_REQUIRED_DOCTOR
} from '../action/userAction';
const INITIAL_STATE = {

    doctorArr: [],
    allRequiredDoctorInfor: []
};
const handleFetchDoctor = (state = INITIAL_STATE, action) => {
    switch (action.type) {



        case HANDLE_FETCH_ALL_DOCTOR: {
            return {
                ...state, doctorArr: action.payload.DT
            }
        }
        case HANDLE_FETCH_REQUIRED_DOCTOR: {
            console.log('check data gender province', action.payload)
            return {
                ...state, allRequiredDoctorInfor: action.payload
            }
        }
        default: return state;
    }
};

export default handleFetchDoctor;