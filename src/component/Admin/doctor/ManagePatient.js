import './ManagePatient.scss'
import React, { Component } from 'react';
import { connect } from "react-redux";
import Select from 'react-select';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getAllPatientForDoctor } from '../../../services/userService';
import moment from 'moment';
import RemedyModel from './RemedyModel';
import { toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay';
import { sendRemedy } from '../../../services/userService';
class ManagePatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: new Date().setHours(0, 0, 0, 0),
            dataPatient: [],
            // remedy
            isOpenRemedyModel: false,
            dataModal: {},
            emailPatient: '',
            image: '',
            isShowLoading: false
        };
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {


    }
    async componentDidMount() {
        this.getDataPatient();

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
            console.log('check data res', res.DT)
            this.setState({
                dataPatient: res.DT
            })
        }
    }
    handleConfirmBooking = (item) => {
        let data = {

            doctorId: item.doctorId,
            patientId: item.patienId,

            email: item.patientData.email,
            timeType: item.timeType,
            patientName: item.patientData.firstName,
            reason: item.reason,
            date: item.date
        }
        console.log('check data', data)
        this.setState({
            isOpenRemedyModel: true,
            dataModal: data
        })

    };
    closeRemedyModal = () => {
        this.setState({
            isOpenRemedyModel: false,
            dataModal: {}

        })
    };
    sendRemedy = async (data) => {
        this.setState({
            isShowLoading: true,
        })
        let { dataModal } = this.state
        let res = await sendRemedy({
            email: data.email,
            image: data.imageBase64,
            doctorId: dataModal.doctorId,
            patientId: dataModal.patientId,
            timeType: dataModal.timeType,
            patientName: dataModal.patientName,
            reason: dataModal.reason,
            date: dataModal.date,

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
    handleRemedy = () => {

    };
    render() {
        let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));

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
                                minDate={yesterday}
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


                                            return (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{time}</td>
                                                    <td>{item.patientData.firstName}</td>
                                                    <td>{item.patientData.address}</td>
                                                    <td>{gender}</td>
                                                    <td>{item.reason}</td>
                                                    <td>

                                                        <button className='mp-btn-confirm'
                                                            onClick={() => this.handleConfirmBooking(item)}
                                                        >Xác Nhận</button>
                                                        <button
                                                            onCanPlay={() => this.handleRemedy()}
                                                            className='mp-btn-remedy'>Gửi Hoá Đơn</button>
                                                    </td>
                                                </tr>
                                            )


                                        })
                                        :
                                        <tr>

                                            <td colSpan={'6'} style={{ textAlign: 'center', color: 'red' }}> No schedule data!</td>
                                        </tr>
                                    }

                                </tbody>


                            </table>
                        </div>
                    </div>
                </div>
                <RemedyModel
                    dataModal={dataModal}
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