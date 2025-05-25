import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcAddImage } from "react-icons/fc";
import { toast } from 'react-toastify';
import { handleUpdateSpecialtyService } from '../../../services/userService'
import _ from 'lodash';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { CommonUtils } from '../../../utils/CommonUtils';
import './ModalUpdateSpecialty.scss';
const ModalUpdateSpecialty = (props) => {

    const mdParser = new MarkdownIt();

    const { showModalUpdateSpecialty, handleFecthAllSpecialty, setDataSpecialty, dataUpdateSpecialty, setShowModalUpdateSpecialty,

    } = props

    const handleClose = () => {
        setShowModalUpdateSpecialty(false);

        setName('');
        setImage('');
        setDescriptionHtml('')
        setDescriptionMarkDown('')
        setPreviewImage('');
        setDataSpecialty('')
    }

    //state
    const [descriptionMarkDown, setDescriptionMarkDown] = useState('')
    const [descriptionHtml, setDescriptionHtml] = useState('')
    const [id, setId] = useState('')
    const [name, setName] = useState('');
    const [image, setImage] = useState([]);

    const [previewImage, setPreviewImage] = useState('');
    // function

    useEffect(() => {
        if (!_.isEmpty(dataUpdateSpecialty)) {
            let data = dataUpdateSpecialty.image
            // check image

            if (data) {
                setPreviewImage(`${data}`);
            }

            // update state
            setId(dataUpdateSpecialty.id);
            setName(dataUpdateSpecialty.name);
            setDescriptionHtml(dataUpdateSpecialty.descriptionHtml)
            setDescriptionMarkDown(dataUpdateSpecialty.descriptionMarkDown)
            setImage(dataUpdateSpecialty.image);
        }
    }, [dataUpdateSpecialty]);
    const handleUploadImage = async (event) => {
        if (event?.target?.files && event?.target?.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]));


            const base64 = await CommonUtils.getBase64(event.target.files[0])
            setImage(base64)


        }
    };


    const handleSubmitUpdateSpecialty = async () => {

        const data = {
            name,

            id,
            image,
            descriptionHtml,
            descriptionMarkDown

        }
        //submit dât

        let res = await handleUpdateSpecialtyService(data)


        if (res.EC === 0) {

            toast.success(res.EM)
            handleFecthAllSpecialty()

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


            <Modal
                show={showModalUpdateSpecialty}
                onHide={handleClose}
                size='xl'
                backdrop='static'
                className='modal-add-user'
                dialogClassName="custom-modal-size"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Update Specialty</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Name</label>
                            <input type="text" className="form-control"
                                onChange={(event) => setName(event.target.value, ...name)}

                                value={name} />
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
                    <Button variant="primary" onClick={handleSubmitUpdateSpecialty}>
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalUpdateSpecialty;