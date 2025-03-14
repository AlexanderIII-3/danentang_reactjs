import axios from "../utils/axiosHost";
const postCreateNewUser = (email, password,
    firstName, lastName,
    role, image,
    gender, position,
    address, phoneNumber) => {
    let data = {
        email,
        password,
        firstName,
        lastName,
        role,
        image,
        gender,
        position,
        address,
        phoneNumber
    }
    return axios.post('api/v1/create-user', data)
};
const getAllUsers = () => {
    return axios.get('api/v1/user/all')
}
const putUpdateUser = (id, userName, role, image) => {
    const data = new FormData();
    data.append('id', id);


    data.append('username', userName);
    data.append('role', role);
    data.append('userImage', image);
    return axios.put('api/v1/participant', data)
};
const deleteUser = (id) => {




    return axios.delete('api/v1/delete', { data: { id: id } })


};
const getUserPaginates = (page, limit) => {

    return axios.get(`api/v1/participant?page=${page}&limit=${limit}`)

};
const postLogin = (email, password) => {





    return axios.post('api/v1/login', {
        email,
        password,
        delay: 3000
    })

};
const postRegister = (email, username, password) => {
    return axios.post('/api/v1/register', {
        email,
        username,
        password
    })

}
const FetchAllCodes = (type) => {
    return axios.get(`/api/v1/fetch/allcode?type=${type}`)

}

export {
    postCreateNewUser, getAllUsers,
    putUpdateUser, deleteUser,
    getUserPaginates, postLogin,
    postRegister, FetchAllCodes
}