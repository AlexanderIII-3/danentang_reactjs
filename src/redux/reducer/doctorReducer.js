
import {

    HANDLE_FETCH_ALL_DOCTOR, HANDLE_FETCH_ALL_DOCTOR_FALL
} from '../action/userAction';
const INITIAL_STATE = {

    doctorArr: []
};
const handleFetchDoctor = (state = INITIAL_STATE, action) => {
    switch (action.type) {



        case HANDLE_FETCH_ALL_DOCTOR: {
            return {
                ...state, doctorArr: action.payload.DT
            }
        }
        default: return state;
    }
};

export default handleFetchDoctor;