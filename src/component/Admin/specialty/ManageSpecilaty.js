import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import './ManageSpecity.scss';
import MarkdownIt from 'markdown-it';
import { CommonUtils } from '../../../utils/CommonUtils';
import MdEditor from 'react-markdown-editor-lite';
import { FcAddImage } from "react-icons/fc";
import { handleCreateSpecialtyService } from '../../../services/userService'
import { toast } from 'react-toastify';

// import ListSpecialty from './ListSpecialty';

const mdParser = new MarkdownIt();

const ManageSpecity = ({ specialtyArr }) => {
    const [previewImgUrl, setPreviewImgUrl] = useState('');
    const [image, setImage] = useState('');
    const [name, setName] = useState('');
    const [descriptionHtml, setDescriptionHtml] = useState('');
    const [descriptionMarkDown, setDescriptionMarkDown] = useState('');
    const [id, setId] = useState('');


    useEffect(() => {
        setPreviewImgUrl('');
        setImage('');
        setName('');
        setDescriptionMarkDown('');
    }, [specialtyArr]);

    const handleOnchangeImage = async (event) => {
        let file = event.target.files[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file);
            setPreviewImgUrl(objectUrl);
            setImage(base64);
        }
    };
    const realoadData = () => {
        setPreviewImgUrl('')
        setImage('')
        setName('')
        setDescriptionMarkDown('')
    }
    const handleOnchange = (event, setter) => {
        setter(event.target.value);
    };



    const handleEditorChange = ({ html, text }) => {
        setDescriptionMarkDown(text);
        setDescriptionHtml(html);
    };

    const handleEditUserFromProps = (data) => {
        if (data) {
            setId(data.id);
            setName(data.name);
            setDescriptionMarkDown(data.descriptionMarkDown);
            setPreviewImgUrl(data.image);
            setImage(data.image);
            setDescriptionHtml(data.descriptionHtml);
        }
    };
    const handleCreateSpecialty = async () => {

        try {
            const data = {
                name,
                descriptionHtml,
                id,
                descriptionMarkDown,
                image

            }
            const res = await handleCreateSpecialtyService(data)
            if (res && res.EC === 0) {
                toast.success(res.EM)
                realoadData()
            } else {
                toast.error(res.EM)
            }
        } catch (error) {
            console.log(error)

        }


    }
    return (
        <div className='manage-specialty-container'>
            <div className='specialty-title'>
                Manage Specialty
            </div>
            <div className='add-new-specialty row'>
                <div className='col-6 form-group'>
                    <label>Name Clinic </label>
                    <input
                        value={name}
                        onChange={(event) => handleOnchange(event, setName)}
                        className='form-control' type='text'
                    />
                </div>

                <div className='col-6 form-group'>
                    <label>Image Specialty </label>
                    <div className='preview-img-container'>
                        <input
                            onChange={handleOnchangeImage}
                            id='previewImg' type='file' hidden
                        />
                        <label className='label-upload' htmlFor='previewImg'>
                            <FcAddImage size={35} />
                            Tải Ảnh <i className='fas fa-upload'></i>
                        </label>
                        {/* <div className='preview-image'
                            style={{ backgroundImage: `url(${previewImgUrl})` }}
                            onClick={openPreviewImg}>
                        </div> */}
                        <div className='col-md-12 img-preview'>
                            {previewImgUrl ?
                                <img src={previewImgUrl} />
                                :
                                <span>Preview Image</span>

                            }

                        </div>
                    </div>
                </div>

                <div className='manage-specialty-editor col-12'>
                    <MdEditor
                        style={{ height: '300px' }}
                        renderHTML={(text) => mdParser.render(text)}
                        onChange={handleEditorChange}
                        value={descriptionMarkDown}
                    />
                </div>
                <div className='col-12 my-4'>
                    <button
                        onClick={() => handleCreateSpecialty()}

                        className='btn-save-specialty'>
                        Save
                    </button>
                </div>
            </div>


            {/* <ListSpecialty handleEditUserFromProps={handleEditUserFromProps} /> */}
        </div>
    );
};





export default ManageSpecity;
