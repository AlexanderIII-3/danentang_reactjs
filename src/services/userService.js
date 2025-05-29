import { act } from "react";
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
const putUpdateUser = (data) => {

    console.log('data update user: ', data);
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

const handleCancelSchedule = (data) => {

    return axios.post('/api/v1/handle-cancel-schedule', data)
}

const getAllPatientForDoctor = (data) => {
    return axios.get(`/api/v1/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`)
}

const postVerifyBookingAppointment = (data) => {
    return axios.post(`/api/v1/verify-booking-appointment`, data)
}
const sendRemedyApi = (data) => {
    return axios.post(`/api/v1/genaral-pdf`, data)
}
const handleGetHistoryPatient = (email) => {

    return axios.get(`/api/v1/get-history-patient?email=${email}`)

}
const handleSaveInforPatient = (data) => {

    return axios.post(`/api/save-infor-patient`, data)

}
const handleSaveFollowUp = (data) => {

    return axios.post('/api/v1/save-follow-up', data)
}
const handleGetPendingReExams = (id) => {
    return axios.get(`/api/v1/fetch-all-rexam?doctorId=${id}`)

}
const handleUpdateFollowUp = (token) => {
    return axios.put('/api/v1/update-follow-up', { token: token })
}
const handleCreateNextReExam = (data) => {
    return axios.post('/api/v1/handle-create-reexam', data)
}
const handleDeletReExam = (data) => {
    return axios.delete('/api/v1/delete-reexam', { data })

};
const handleUpdateReExamService = (data) => {

    return axios.put('/api/v1/update-reexam', data)
}
const getBasicInfoByPatientId = (patientId, actor) => {
    return axios.get(`/api/v1/get-basic-info-by-patient-id?patientId=${patientId}&actor=${actor}`)
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
    handleCancelSchedule, handleSaveFollowUp,
    handleGetPendingReExams, handleCreateNextReExam,


    fetchAllDoctor, saveInforDoctor, bulkCreateSchedule,
    getAllPatientForDoctor, postVerifyBookingAppointment, sendRemedyApi,
    handleGetHistoryPatient, handleSaveInforPatient, handleUpdateFollowUp,
    handleDeletReExam, handleUpdateReExamService, getBasicInfoByPatientId
}