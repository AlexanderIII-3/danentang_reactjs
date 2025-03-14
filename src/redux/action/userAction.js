export const HANDLE_LOGIN_COMPLETE = 'HANDLE_LOGIN_COMPLETE';
export const HANDLE_LOGOUT_COMPLETE = 'HANDLE_LOGOUT_COMPLETE'

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

