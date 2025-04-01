import React, { useState } from 'react';
import { CommonUtils } from '../../../utils/CommonUtils';
import { FcAddImage } from "react-icons/fc";
import { createNewClinic } from '../../../services/userService'
import './ManageSpecity.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';

import ListSpecialty from './ListSpecialty';
import { toast } from 'react-toastify';

const mdParser = new MarkdownIt();

const ManageClinic = () => {
    const [state, setState] = useState({
        previewImgUrl: '',
        image: '',
        isOpen: false,
        name: '',
        address: '',
        descriptionHtml: '',
        descriptionMarkDown: '',
        id: '',
        action: 'CREATE',
    });

    // async componentDidMount() {
    //     // props.getRequiredSpecialtyInfor();
    // }
    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     if (prevProps.specialtyArr !== props.specialtyArr) {
    //         setState({
    //             previewImgUrl: '',
    //             image: '',
    //             isOpen: false,
    //             action: '',
    //             nameDes: '',
    //             description: '',
    //         })
    //     }
    // }
    const handleCreateNewClinic = async () => {

        if (state.action === "CREATE") {
            let data = await createNewClinic({
                name: state.name,
                address: state.address,
                descriptionHtml: state.descriptionHtml,
                descriptionMarkDown: state.descriptionMarkDown,
                image: state.image,
                action: "CREATE"

            })
            if (data && data.EC === 0) {
                toast.success('Create New Clinic Success!')
                setState({
                    name: '',
                    address: '',
                    descriptionHtml: '',
                    descriptionMarkDown: '',
                    image: '',
                    previewImgUrl: '',
                    action: "CREATE"

                })
            } else {
                toast.error('Create New Clinic faled!')

            }
        }
        // if (state.action === CRUD_ACTIONS.EDIT) {
        //     let data = await createNewClinic({
        //         name: state.name,
        //         address: state.address,
        //         descriptionHtml: state.descriptionHtml,
        //         descriptionMarkDown: state.descriptionMarkDown,
        //         image: state.image,
        //         action: CRUD_ACTIONS.EDIT
        //     })
        //     if (data && data.errorCode === 0) {
        //         toast.success('Edit Clinic Success!')
        //         setState({
        //             name: '',
        //             address: '',
        //             descriptionHtml: '',
        //             descriptionMarkDown: '',
        //             image: '',
        //             previewImgUrl: '',
        //             action: CRUD_ACTIONS.CREATE

        //         })
        //     } else {
        //         toast.error('Edit  Clinic faled!')

        //     }
        // }

    }
    const handleOnchangeImage = async (event) => {
        let file = event.target.files[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file);
            setState(prevState => ({
                ...prevState,
                previewImgUrl: objectUrl,
                image: base64,
            }));
        }
    };

    const handleOnchange = (event, id) => {
        setState(prevState => ({
            ...prevState,
            [id]: event.target.value
        }));
    };

    const openPreviewImg = () => {
        if (!state.previewImgUrl) return;
        setState(prevState => ({
            ...prevState,
            isOpen: true
        }));
    };

    const handleEditorChange = ({ html, text }) => {
        setState(prevState => ({
            ...prevState,
            descriptionMarkDown: text,
            descriptionHtml: html
        }));
    };

    const handleEditUserFromProps = (data) => {
        if (data) {
            setState(prevState => ({
                ...prevState,
                id: data.id,
                name: data.name,
                descriptionMarkDown: data.descriptionMarkDown,
                previewImgUrl: data.image,
                image: data.image,
                action: "EDIT",
                descriptionHtml: data.descriptionHtml,
            }));
        }
    };

    return (
        <div className='manage-specialty-container'>
            <div className='specialty-title'>Manage Specialty</div>
            <div className='add-new-specialty row'>
                <div className='col-6 form-group'>
                    <label>Name Clinic</label>
                    <input
                        value={state.name}
                        onChange={(event) => handleOnchange(event, 'name')}
                        className='form-control'
                        type='text'
                    />
                </div>

                <div className='col-6 form-group'>
                    <label>Image Specialty</label>
                    <div className='preview-img-container'>
                        <input
                            onChange={handleOnchangeImage}
                            id='previewImg'
                            type='file'
                            hidden
                        />
                        <label className='label-upload' htmlFor='previewImg' >
                            <FcAddImage size={'2em'} /> Tải Ảnh <i className='fas fa-upload'></i>
                        </label>
                        <div
                            className='preview-image'
                            style={{ backgroundImage: `url(${state.previewImgUrl})` }}
                            onClick={openPreviewImg}
                        />
                        <div className='col-md-12 img-preview'>
                            {state.previewImgUrl ?
                                <img src={state.previewImgUrl} />
                                :
                                <span>Preview Image</span>

                            }

                        </div>
                    </div>
                </div>
                <div className='col-6 form-group'>
                    <label>Address Clinic </label>
                    <input
                        value={state.address}
                        onChange={(event) => handleOnchange(event, 'address')}
                        className='form-control' type='text'>

                    </input>
                </div>
                <div className='manage-specialty-editor col-12'>
                    <MdEditor
                        style={{ height: '300px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={handleEditorChange}
                        value={state.descriptionMarkDown}
                    />
                </div>

                <div className='col-12 my-4'>
                    <button className='btn-save-specialty'
                        onClick={() => { handleCreateNewClinic() }}

                    >
                        {state.action === 'CREATE' ? "Save" : "Edit"}
                    </button>
                </div>
            </div>

            {/* {state.isOpen === true &&
                    // <Lightbox
                    //     mainSrc={state.previewImgUrl}
                    //     onCloseRequest={() => setState({ isOpen: false })}
                    // />
                } */}
            <ListSpecialty />
        </div>
    );
};

export default ManageClinic;