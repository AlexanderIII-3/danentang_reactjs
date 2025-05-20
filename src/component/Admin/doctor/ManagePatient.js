import './ManagePatient.scss'
import React, { Component } from 'react';
import { connect } from "react-redux";
import Select from 'react-select';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getAllPatientForDoctor } from '../../../services/userService';
import moment from 'moment';
import ResultModal from './ResultModal';
import { toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay';
import { sendRemedy, handleSaveInforPatient, handleCancelSchedule } from '../../../services/userService';
import { result } from 'lodash';
import PatientInfoModal from './PatientInfoModal';
import CancelAppointmentConfirmModal from './CancelAppointmentConfirmModal';
class ManagePatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: new Date().setHours(0, 0, 0, 0),
            dataPatient: [],
            // remedy
            isOpenRemedyModel: false,
            isOpenPatientInfoModel: false,
            dataModal: {},
            emailPatient: '',
            image: '',
            isShowLoading: false,
            patientDone: false,
            dataPatientModal: {},

            isOpenCancel: false,
            dataCancel: {}
        };
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {


    }
    async componentDidMount() {
        this.getDataPatient();

    }
    closeCancelModal = () => {
        this.setState({
            isOpenCancel: false
        })
    }

    handleChangeDatePicker = (date) => {
        date.setHours(0, 0, 0, 0);

        this.setState({
            currentDate: date.getTime()

        }, async () => {


            await this.getDataPatient()
        });
    }
    getDataPatient = async () => {
        let { account } = this.props.user;

        let { currentDate } = this.state;
        // let formatedDate = new Date(currentDate).getTime();
        let res = await getAllPatientForDoctor({
            doctorId: account.id,
            date: currentDate
        });
        if (res && res.EC === 0) {
            this.setState({
                dataPatient: res.DT
            })
        }
    }
    handleConfirmBooking = (item) => {
        let patientname = item.patientData.firstName + item.patientData.lastName

        let data = {

            doctorId: item.doctorId,
            patientId: item.patienId,

            email: item?.patientData?.email,
            timeType: item.timeType,
            patientName: patientname,
            reason: item.reason,
            date: item.date
        }
        this.setState({
            isOpenRemedyModel: true,
            dataModal: data,
        })

    };
    closeRemedyModal = () => {
        this.setState({
            isOpenRemedyModel: false,


        })
    };
    sendRemedy = async (data) => {
        let { account } = this.props.user;
        let doctorname = account.firstName + " " + account.lastName

        this.setState({
            isShowLoading: true,
        })
        let { dataModal } = this.state

        let res = await sendRemedy({
            email: dataModal.email,
            doctorId: dataModal.doctorId,
            doctorname: doctorname,
            patientId: dataModal.patientId,
            timeType: dataModal.timeType,
            patientName: dataModal.patientName,
            reason: dataModal.reason,
            date: dataModal.date,
            result: data.result,
            prescription: data.prescription,
            note: data.note,
        })

        if (res && res.EC === 0) {
            this.setState({
                isShowLoading: false,
            })
            toast.success("Send Remedy Success!")
            await this.getDataPatient();
            this.closeRemedyModal();

        } else {
            toast.error("Send Remedy Error!")
        }
    };
    handleRemedy = (item) => {
        this.setState({
            isOpenPatientInfoModel: true,
            dataPatientModal: item,
        })
    };
    handleCancelSchudule = (item) => {
        this.setState({
            isOpenCancel: true,
            dataCancel: item
        })
    }
    confirmCancel = async (data) => {
        this.setState({
            isOpenCancel: false
        })

        let dataCancel = {
            doctorId: data.doctorId,
            date: data.date,
            patienId: data.patienId,
            timeType: data.timeType
        };
        let res = await handleCancelSchedule(dataCancel)
        if (res && res.EC === 0) {

            toast.success(res.EM)
            this.getDataPatient();
        } else {
            toast.error(res.EM)
        }
    }
    handleClosePatientInfoModal = () => {
        this.setState({
            isOpenPatientInfoModel: false,
        })
    }
    handleSavePatientInfo = async (data) => {
        let res = await handleSaveInforPatient(data)

        if (res && res.EC === 0) {
            toast.success(res.EM)
            this.setState({
                isOpenPatientInfoModel: false,
                patientDone: true,
            })
            await this.getDataPatient();
        } else {
            toast.error(res.EM)
        }
    }
    render() {
        let tomoraw = new Date(new Date().setDate(new Date().getDate() + 1));

        let { dataPatient, dataModal, isOpenRemedyModel } = this.state;

        return (

            <>

                <div className='manage-patient-container' >
                    <div className='m-p-title'>
                        Quản Lý Bệnh Nhân Khám Bệnh
                    </div>
                    <div className='manage-patient-body row'>
                        <div className='col-6 form-group'>

                            <DatePicker
                                selected={this.state.currentDate}
                                onChange={(date) => { this.handleChangeDatePicker(date) }}
                                dateFormat={'dd/MM/yyyy'}
                                maxDate={tomoraw}
                                isClearable
                            />
                        </div>
                        <div className='col-12 table-manage-patient'>
                            <table style={{ width: '100%' }}>
                                <tbody>
                                    <tr>
                                        <th>STT</th>
                                        <th>Thời Gian</th>
                                        <th>Họ Và Tên</th>
                                        <th>Địa Chỉ</th>
                                        <th>Giới Tính</th>
                                        <th>Triệu Chứng</th>
                                        <th>Action</th>
                                    </tr>
                                    {dataPatient && dataPatient.length > 0 ?

                                        dataPatient.map((item, index) => {
                                            let gender = item?.patientData?.genderData ? item?.patientData?.genderData?.valueVi : ''
                                            let time = item?.timeBookingData ? item?.timeBookingData?.valueVi : ''
                                            console.log('check data item', dataPatient)

                                            return (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{time}</td>
                                                    <td>{item.patientData.firstName}</td>
                                                    <td>{item.patientData.address}</td>
                                                    <td>{gender}</td>
                                                    <td>{item.reason}</td>
                                                    <td>
                                                        {

                                                            this.state.patientDone === false ? <> <button
                                                                onClick={() => this.handleRemedy(item)}
                                                                className='mp-btn-remedy'>Nhập thông tin</button>
                                                                <button className='mp-btn-cancel'
                                                                    onClick={() => this.handleCancelSchudule(item)}
                                                                >
                                                                    Huỷ lịch

                                                                </button>
                                                            </>

                                                                :

                                                                <button className='mp-btn-confirm'
                                                                    onClick={() => this.handleConfirmBooking(item)}
                                                                >Xác Nhận</button>


                                                        }


                                                    </td>
                                                </tr>
                                            )


                                        })
                                        :
                                        <tr>

                                            <td colSpan={'7'} style={{ textAlign: 'center', color: 'red' }}> Hiện tại chưa có lịch hẹn!</td>
                                        </tr>
                                    }

                                </tbody>


                            </table>
                        </div>
                    </div>



                </div>


                <PatientInfoModal

                    show={this.state.isOpenPatientInfoModel}
                    onClose={this.handleClosePatientInfoModal}
                    handleSave={this.handleSavePatientInfo}
                    dataPatientModal={this.state.dataPatientModal}
                >

                </PatientInfoModal>
                <CancelAppointmentConfirmModal
                    show={this.state.isOpenCancel}
                    onClose={this.closeCancelModal}
                    onConfirm={this.confirmCancel}
                    dataCancel={this.state.dataCancel}
                />
                <ResultModal
                    isOpen={isOpenRemedyModel}
                    closeRemedyModal={this.closeRemedyModal}
                    sendRemedy={this.sendRemedy}
                />
            </>
        );
    }
}

const mapStateToProps = state => {
    return {


        user: state.userInfo,


    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);