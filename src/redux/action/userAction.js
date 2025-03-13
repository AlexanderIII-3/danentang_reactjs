export const HANDLE_LOGIN_COMPLETE = 'HANDLE_LOGIN_COMPLETE';


export const handleLoginRedux = (data) => {
    return {
        type: HANDLE_LOGIN_COMPLETE,
        payload: data
    };
};

