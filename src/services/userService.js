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
const FetchAllDoctor = () => {
    return axios.get('/api/v1/getAllDoctors')
}
const createNewClinic = (data) => {

    return axios.post('/api/v1/create-new-clinic', data)
}
const handleFetchAllClinic = () => {

    return axios.get('/api/v1/get-all-clinic')
}
const handleDeleteClinicService = (id) => {
    return axios.post('/api/v1/delete-clinic', { id: id })
}
const handleUpdateClinicService = (data) => {
    return axios.post('/api/v1/update-clinic', data)
}
const handleCreateSpecialtyService = (data) => {
    return axios.post('/api/v1/specialty-save-infor', data)
}
const handleFetchALlSpecialtyService = () => {

    return axios.get('/api/v1/fetch-specialty-infor');
}
const handleDeleteSpecialty = (id) => {
    return axios.post('/api/v1/handle-delete-specialty', { id: id })

}
const handleUpdateSpecialtyService = (data) => {
    return axios.post('/api/v1/handle-update-specialty', data)

}

//doctor

const fetchAllDoctor = () => {
    return axios.get('/api/v1/getAllDoctors')

}
const getDetailInforDoctor = (id) => {
    return axios.get(`api/v1/get-details-doctor?id=${id}`)
}
const saveInforDoctor = (data) => {

    return axios.post('/api/v1/save-infor-doctor', data)

}
const bulkCreateSchedule = (data) => {

    return axios.post('/api/bulk-create-schedule', data)

}

const getAllPatientForDoctor = (data) => {
    return axios.get(`/api/v1/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`)
}

const postVerifyBookingAppointment = (data) => {
    return axios.post(`/api/v1/verify-booking-appointment`, data)
}

export {
    postCreateNewUser, getAllUsers,
    putUpdateUser, deleteUser,
    getUserPaginates, postLogin,
    postRegister, FetchAllCodes,
    FetchAllDoctor, createNewClinic,
    handleFetchAllClinic, handleDeleteClinicService,
    handleUpdateClinicService, handleCreateSpecialtyService,
    handleFetchALlSpecialtyService, handleDeleteSpecialty,
    handleUpdateSpecialtyService, getDetailInforDoctor,


    fetchAllDoctor, saveInforDoctor, bulkCreateSchedule,
    getAllPatientForDoctor, postVerifyBookingAppointment
}