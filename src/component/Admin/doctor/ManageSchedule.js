import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageSchedule.scss'
import Select from 'react-select';
import { LANGUAGES } from '../../../utils/const';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
// import { bulkCreateSchedule } from '../../../services/userService';
import _ from 'lodash'

class ManageSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listDoctor: [],
            selectedDoctor: {},
            currentDate: '',
            rangeTime: []
        }
    }
    componentDidMount() {
        // this.props.fetchAllDoctor();
        // this.props.fetchAllScheduleTime();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        let dataSelect = this.buildDataInputSelect(this.props.allDoctor)
        if (prevProps.allDoctor !== this.props.allDoctor) {
            this.setState({
                listDoctor: dataSelect
            })
        }

        if (prevProps.dataTime !== this.props.dataTime) {
            let data = this.props.dataTime
            if (data && data.length > 0) {

                // data.map(item => {
                //     item.isSelected = false;
                //     return item;
                // })
                data = data.map(item => ({ ...item, isSelected: false }));
            }
            this.setState({
                rangeTime: data
            })
        }
    }
    buildDataInputSelect = (inputData) => {
        let result = [];
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                let labelVi = `${item.lastName} ${item.firstName}`;
                object.label = labelVi
                object.value = item.id;
                result.push(object)
            })

            return result
        }
    };
    handleChange = async selectedDoctor => {
        this.setState({ selectedDoctor });

    };
    handleChangeDetePicker = (date) => {
        this.setState({
            currentDate: date
        })
        console.log('check datte picker', date)
    }
    handleClickButtonTime = (time) => {
        let { rangeTime } = this.state
        if (rangeTime && rangeTime.length > 0) {
            rangeTime = rangeTime.map(item => {
                if (item.id === time.id) item.isSelected = !item.isSelected;
                return item;
            })
            this.setState({
                rangeTime: rangeTime
            })
        }
    }
    handleSaveSchedule = async () => {
        let { rangeTime, selectedDoctor, currentDate } = this.state
        let result = [];
        if (!currentDate) {
            toast.error("Invalid Date!")
            return;
        }
        if (selectedDoctor && _.isEmpty(selectedDoctor)) {
            toast.error("Invalid Slected Doctor!")
            return;


        }


        let formatDate = new Date(currentDate).getTime();
        if (rangeTime && rangeTime.length > 0) {
            let slectedTime = rangeTime.filter(item => item.isSelected === true)
            if (slectedTime && slectedTime.length > 0) {
                slectedTime.map(item => {
                    let object = {};
                    object.doctorId = selectedDoctor.value
                    object.date = formatDate
                    object.timeType = item.keyMap
                    result.push(object)
                })

            } else {
                toast.error("Invalid Slected Time!")
                return;
            }
        }
        // let res = await bulkCreateSchedule({
        //     arrSchedule: result,
        //     doctorId: selectedDoctor.value,
        //     date: formatDate

        // })
        // console.log('check ress : ', res)
        // if (res && res.errorCode === 0) {
        //     toast.success("Create New Schedule Success!")

        // }
    };
    render() {
        let { rangeTime } = this.state
        let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));

        return (
            <div className='manage-schedule-container'>
                <div className='m-s-title'>
                    Manage Schedule
                </div>
                <div className='container'>
                    <div className='row' >
                        <div className='col-6 form-group'>
                            <label> Choose doctor </label>
                            <Select
                                value={this.state.selectedDoctor}
                                onChange={this.handleChange}
                                options={this.state.listDoctor}
                            />
                        </div>
                        <div className='col-6 form-group'>
                            <label> Choose Day </label>
                            <DatePicker
                                selected={this.state.currentDate}
                                onChange={(date) => { this.handleChangeDetePicker(date) }}
                                dateFormat={'dd/MM/yyyy'}
                                minDate={yesterday}
                                isClearable
                            />
                        </div>
                        <div className='col-12 pick-hour-container' >
                            {rangeTime && rangeTime.length > 0 &&
                                rangeTime.map((item, index) => {

                                    return (
                                        <button
                                            onClick={() => this.handleClickButtonTime(item)}
                                            className={item.isSelected === true ? 'btn btn-schedule active' : 'btn btn-schedule '} key={index} >
                                            {item.valueVI}  </button>
                                    )
                                }

                                )}
                        </div>
                        <div className='col-12'>
                            <button
                                onClick={() => this.handleSaveSchedule()}
                                className='btn btn-primary btn-save-schedule' >Save Info</button>
                        </div>
                    </div>
                </div>


            </div>
        );
    }
}

const mapStateToProps = state => {
    return {



        // allDoctor: state.admin.allDoctor,
        // dataTime: state.admin.dataTime

    };
};

const mapDispatchToProps = dispatch => {
    return {
        // fetchAllDoctor: () => dispatch(fetchAllDoctor()),
        // fetchAllScheduleTime: () => dispatch(fetchAllScheduleTime()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);