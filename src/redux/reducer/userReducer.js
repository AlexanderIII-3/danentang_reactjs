
import { HANDLE_LOGIN_COMPLETE } from '../action/userAction';
const INITIAL_STATE = {
    account: {
        email: '',
        firstName: '',
        lastName: '',
        roleId: '',
    },
    isLogin: false,
};
const handleLoginReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case HANDLE_LOGIN_COMPLETE:
            console.log('check action ', action)
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


        default: return state;
    }
};

export default handleLoginReducer;