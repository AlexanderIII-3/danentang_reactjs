
import {

    HANDLE_FETCH_ALL_DOCTOR, HANDLE_FETCH_ALL_DOCTOR_FALL, HANDLE_FETCH_REQUIRED_DOCTOR, FETCH_ALL_ALLCODE_SCHEDULE_TIME_SUCCESS
} from '../action/userAction';
const INITIAL_STATE = {
    timeArr: [],
    doctorArr: [],
    allRequiredDoctorInfor: []
};
const handleFetchDoctor = (state = INITIAL_STATE, action) => {
    switch (action.type) {



        case HANDLE_FETCH_ALL_DOCTOR: {
            return {
                ...state, doctorArr: action.payload
            }
        }
        case HANDLE_FETCH_REQUIRED_DOCTOR: {
            return {
                ...state, allRequiredDoctorInfor: action.payload
            }
        }
        case FETCH_ALL_ALLCODE_SCHEDULE_TIME_SUCCESS: {
            return {
                ...state, timeArr: action.payload
            }
        }
        default: return state;
    }
};

export default handleFetchDoctor;