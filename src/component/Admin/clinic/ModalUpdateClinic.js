import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcAddImage } from "react-icons/fc";
import { toast } from 'react-toastify';
import { handleUpdateClinicService } from '../../../services/userService'
import _ from 'lodash';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { CommonUtils } from '../../../utils/CommonUtils';

const ModalUpdateClinic = (props) => {

    const mdParser = new MarkdownIt();

    const { showModalUpdateClinic, setShowModalUpdateClinic,
        dataUpdateClinic, setDataUpdateClinic, handeFeacthAllClinic
    } = props
    console.log('check data', dataUpdateClinic)

    const handleClose = () => {
        setShowModalUpdateClinic(false);
        setAddress('');
        setName('');
        setImage('');
        setDescriptionHtml('')
        setDescriptionMarkDown('')
        setPreviewImage('');
        setDataUpdateClinic('')
    }

    //state
    const [descriptionMarkDown, setDescriptionMarkDown] = useState('')
    const [descriptionHtml, setDescriptionHtml] = useState('')
    const [id, setId] = useState('')
    const [address, setAddress] = useState('');
    const [name, setName] = useState('');
    const [image, setImage] = useState([]);

    const [previewImage, setPreviewImage] = useState('');
    // function

    useEffect(() => {
        if (!_.isEmpty(dataUpdateClinic)) {
            let data = dataUpdateClinic.image
            // check image

            if (data) {
                setPreviewImage(`${data}`);
            }

            // update state
            setId(dataUpdateClinic.id);
            setAddress(dataUpdateClinic.address);
            setName(dataUpdateClinic.name);
            setDescriptionHtml(dataUpdateClinic.descriptionHtml)
            setDescriptionMarkDown(dataUpdateClinic.descriptionMarkDown)
            setImage(dataUpdateClinic.image);
        }
    }, [dataUpdateClinic]);
    const handleUploadImage = async (event) => {
        if (event?.target?.files && event?.target?.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]));


            const base64 = await CommonUtils.getBase64(event.target.files[0])
            setImage(base64)


        }
    };


    const handleSubmitUpdateClinic = async () => {

        const data = {
            name,
            address,
            id,
            image,
            descriptionHtml,
            descriptionMarkDown

        }
        //submit dât

        let res = await handleUpdateClinicService(data)


        if (res.EC === 0) {

            toast.success(res.EM)
            handeFeacthAllClinic()

            handleClose()

        } else {
            toast.error(res.EM)
        }





    };
    const handleEditorChange = ({ html, text }) => {

        setDescriptionHtml(html, ...descriptionHtml)
        setDescriptionMarkDown(text, ...descriptionMarkDown)

    };

    return (
        <>


            <Modal show={showModalUpdateClinic}
                onHide={handleClose}
                size='xl'
                backdrop='static'
                className='modal-add-user'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Update User</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Name</label>
                            <input type="text" className="form-control"
                                onChange={(event) => setName(event.target.value, ...name)}

                                value={name} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Addres</label>
                            <input
                                onChange={(event) => setAddress(event.target.value, ...address)}
                                type="text" className="form-control" value={address} />
                        </div>


                        <div className='col-md-12'>
                            <label className="form-label label-upload" htmlFor='upload-image'>
                                <FcAddImage size={'2em'} /> Upload File Image
                            </label>
                            <input
                                onChange={(event) => handleUploadImage(event)}
                                id='upload-image' type='file' hidden ></input>
                        </div>
                        <div className='col-md-12 img-preview'>
                            {previewImage ?
                                <img src={previewImage} />
                                :
                                <span>Preview Image</span>

                            }

                        </div>
                        <div>

                            <MdEditor
                                style={{ height: '300px' }}
                                renderHTML={text => mdParser.render(text)}
                                onChange={handleEditorChange}
                                value={descriptionMarkDown}
                            />
                        </div>



                    </form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmitUpdateClinic}>
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalUpdateClinic;