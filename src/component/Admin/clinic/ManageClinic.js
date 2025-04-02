import React, { useEffect, useState } from 'react';
import { CommonUtils } from '../../../utils/CommonUtils';
import { FcAddImage } from "react-icons/fc";
import { createNewClinic } from '../../../services/userService'
import './ManageSpecity.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { handleFetchAllClinic, handleDeleteClinicService } from '../../../services/userService'
import ListClinic from './ListClinic';
import { toast } from 'react-toastify';
import ModalUpdateClinic from './ModalUpdateClinic';

const mdParser = new MarkdownIt();

const ManageClinic = () => {
    const [listClinic, setListClinic] = useState({})
    const [showModalUpdateClinic, setShowModalUpdateClinic] = useState(false)
    const [dataUpdateClinic, setDataUpdateClinic] = useState({})
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
    useEffect(() => {
        handeFeacthAllClinic()
    }, [])

    const handeFeacthAllClinic = async () => {
        const res = await handleFetchAllClinic()
        if (res && res.EC === 0) {

            setListClinic(res.DT)

        }

    }
    const handleUpdateClinic = (data) => {
        setDataUpdateClinic(data)
        setShowModalUpdateClinic(!showModalUpdateClinic)
    }
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
                handeFeacthAllClinic()

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


    }
    const handleDeleteClinic = async (data) => {
        console.log('check data', data)

        let res = await handleDeleteClinicService(data.id)
        if (res && res.EC === 0) {
            toast.success(res.EM)
            handeFeacthAllClinic()
        } else {
            toast.error(res.EM)
        }


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
            <div className='specialty-title'>Manage Clinic</div>
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
            <ListClinic
                handleDeleteClinic={handleDeleteClinic}
                listClinic={listClinic}
                handleUpdateClinic={handleUpdateClinic}


            />
            <ModalUpdateClinic
                showModalUpdateClinic={showModalUpdateClinic}
                setShowModalUpdateClinic={setShowModalUpdateClinic}
                dataUpdateClinic={dataUpdateClinic}
                setDataUpdateClinic={setDataUpdateClinic}
                handeFeacthAllClinic={handeFeacthAllClinic}
            />
        </div>
    );
};

export default ManageClinic;