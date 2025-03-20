import React, { Component, useEffect, useState } from 'react';

import './ManageDoctor.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { NavLink, useNavigate } from 'react-router-dom';
import { handleFetchAllDoctor } from '../../../redux/action/userAction';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
// import { getDetailInforDoctor } from '../../../services/userService';



const mdParser = new MarkdownIt(/* Markdown-it options */);



const ManageDoctor = (pops) => {
    const doctors = useSelector(state => state.doctor.allRequiredDoctorInfor)
    const dispatch = useDispatch()

    useEffect(() => {
        fetchAllCode()


        handleFetchBuldData()


    }, [])

    const fetchAllCode = async () => {
        let res = await dispatch(handleFetchAllDoctor())
    }
    //save markdown
    const [contenMarkdown, setContenMarkdown] = useState('')
    const [contentHtml, setContentHtml] = useState('')
    const [selectedDoctor, setSelectedDoctor] = useState('')
    const [description, setDescription] = useState('')
    const [listDoctor, setListDoctor] = useState('')
    const [checkData, setCheckData] = useState('')



    //savve doctor infor
    const [listPrice, setListPrice] = useState([])
    const [listPayment, setListPayment] = useState([])
    const [listProvinces, setListProvinces] = useState([])
    const [listClinic, setListClinic] = useState([])
    const [listSpecialty, setListSpecialty] = useState([])
    const [selectedPrice, setSelectedPrice] = useState('')
    const [selectedPayment, setSelectedPayment] = useState('')
    const [selectedProvince, setSelectedProvince] = useState('')
    const [nameClinic, setNameClinic] = useState('')
    const [addressClinic, setAddressClinic] = useState('')
    const [selectedClinic, setSelectedClinic] = useState('')
    const [selectedSpecialty, setSelectedSpecialty] = useState('')
    const [note, setNote] = useState('')
    const [clinicId, setClinicId] = useState('')



    const handleFetchBuldData = async () => {
        let dataPayment = await buildDataInputSelect(doctors.resPayment, 'PAYMENT')
        let dataPrice = await buildDataInputSelect(doctors.resPrice, 'PRICE')
        let dataProvince = await buildDataInputSelect(doctors.resProvince, "PROVINCE")

        setListPrice(dataPrice);
        setListPayment(dataPayment);
        setListProvinces(dataProvince)
        console.log('heck bulld price', listPrice)
    }


    const handleEditorChange = ({ html, text }) => {
        console.log('handleEditorChange', html, text);
        this.setState({
            contentMarkDown: text,
            contentHtml: html
        })
    }

    const handleChangeSlectDoctorInfor = async (selectedOption, name) => {
        let stateName = name.name;
        let copyState = { ...this.state };
        copyState[stateName] = selectedOption;
        this.setState({
            ...copyState,
        });

    }
    const handleChangeText = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        }, () => {
            console.log('check copy state', this.state)
        })
    };
    const buildDataInputSelect = (inputData, type) => {
        let result = [];
        if (inputData && inputData.length > 0) {
            if (type === "USER") {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.lastName} ${item.firstName}`;
                    let labelEn = `${item.firstName} ${item.lastName}`;
                    object.label = labelEn;
                    object.value = item.id;
                    result.push(object)
                })
            }
            if (type === "PRICE") {
                inputData.map((item, index) => {
                    let object = {};

                    let labelEn = `${item.valueEn} USD`;
                    object.label = labelEn;
                    object.value = item.keyMap;
                    result.push(object)
                })
            }
            if (type === "PAYMENT") {
                inputData.map((item, index) => {
                    let object = {};

                    let labelEn = item.valueEn;
                    object.label = labelEn;
                    object.value = item.keyMap;
                    result.push(object)
                })
            }
            if (type === "PROVINCE") {
                inputData.map((item, index) => {
                    let object = {};

                    let labelEn = item.valueEn;
                    object.label = labelEn;
                    object.value = item.keyMap;
                    result.push(object)
                })
            }
            // if (type === 'SPECIALTY') {
            //     inputData.map((item, index) => {
            //         let object = {};

            //         object.label = item.name;
            //         object.value = item.id;
            //         result.push(object)
            //     })
            // }
            // if (type === 'CLINIC') {
            //     inputData.map((item, index) => {
            //         let object = {};

            //         object.label = item.name;
            //         object.value = item.id;
            //         result.push(object)
            //     })
            // }

            return result
        }
    };

    const handleChang = (event) => {
        console.log(event.value)
    }
    return (

        <div className='manage-doctor-container'>



            <div className="manage-doctor-title"  >Manage Doctor</div>


            <div className='more-infor'>
                <div className='content-left form-group'>

                    <label className=''>Choose Doctor</label>
                    {/* <Select
                        value={this.state.selectedDoctor}
                        onChange={this.handleChange}
                        options={this.state.listDoctor}
                        placeholder={'Choose a doctor'}
                    /> */}

                </div>
                {/* <div className='content-right'>
                    <label>Infomation</label>
                    <textarea
                        onChange={(event) => this.handleChangeText(event, 'description')}
                        className='form-control'

                        value={this.state.description}
                    >

                    </textarea>
                </div> */}



            </div>
            <div className='more-infor-extra row'>
                <div className='col-4 form-group'>
                    <label>Choose Price:</label>


                    <Select
                        value={selectedPrice}
                        onChange={(event) => { setSelectedPrice(event) }}
                        options={listPrice}
                        placeholder={'Choose Price'}


                    />



                </div>
                <div className='col-4 form-group'>
                    <label>Choose Payment:</label>
                    <Select
                        value={selectedPayment}
                        onChange={(event) => { setSelectedPayment(event) }}
                        options={listPayment}
                        placeholder={'Choose method payment'}

                    />

                </div>
                <div className='col-4 form-group'>
                    <label>Choose Province:</label>
                    <Select
                        value={selectedProvince}
                        onChange={(event) => { setSelectedProvince(event) }}
                        options={listProvinces}
                        placeholder={'Choose province'}

                    />


                </div>


                {/* <div className='col-4 form-group'>
                        <label>Choose Clinic:</label>
                        <input
                            onChange={(event) => this.handleChangeText(event, 'nameClinic')}
                            value={this.state.nameClinic}

                            className='form-control'></input>

                    </div>
                    <div className='col-4 form-group'>
                        <label>Choose address clinic:</label>
                        <input
                            onChange={(event) => this.handleChangeText(event, 'addressClinic')}
                            value={this.state.addressClinic}
                            className='form-control'></input>
                    </div> */}
                {/* <div className='col-4 form-group'>
                    <label> Write Note:</label>
                    <input
                        onChange={(event) => this.handleChangeText(event, 'note')}
                        value={this.state.note}
                        className='form-control'></input>

                </div> */}

            </div>



            {/* <div className='row'>
                    <div className='col-4 form-group'>
                        <label>Chọn Chuyên Khoa</label>
                        <Select
                            value={this.state.selectedSpecialty}
                            onChange={this.handleChangeSlectDoctorInfor}
                            options={this.state.listSpecialty}
                            name='selectedSpecialty'
                            placeholder={'Choose a specialty'}
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label>Chọn Phòng Khám</label>
                        <Select
                            value={this.state.selectedClinic}
                            onChange={this.handleChangeSlectDoctorInfor}
                            options={this.state.listClinic}
                            name='selectedClinic'
                            placeholder={'Choose a specialty'}
                        />                    </div>
                </div> */}
            <div className='manage-doctor-editor'>
                {/* <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)}
                    onChange={handleEditorChange}
                    value={contentMarkDown}


                /> */}
            </div>

            <button
                // onClick={() => handleSaveContent()}
                className='create-content-doctor'>
                save</button>
        </div>

    );
}



const mapStateToProps = state => {
    return {
        language: state.app.language,

        allDoctor: state.admin.allDoctor,
        allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
        // saveInforDoctor: (data) => dispatch(actions.saveInforDoctor(data)),
        // getRequiredDoctorInfor: () => dispatch(actions.getRequiredDoctorInfor()),

    };
};

export default ManageDoctor;

