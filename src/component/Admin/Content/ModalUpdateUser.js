import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcAddImage } from "react-icons/fc";
import { toast } from 'react-toastify';
import { putUpdateUser } from '../../../services/userService'
import _ from 'lodash';
import { CommonUtils } from '../../../utils/CommonUtils';

const bufferToBase64 = (buffer) => {
    if (!buffer || !buffer.data) return '';
    const base64String = btoa(
        new Uint8Array(buffer.data)
            .reduce((data, byte) => data + String.fromCharCode(byte), '')
    );
    return `data:image/png;base64,${base64String}`;
};

const ModalUpdateUser = (props) => {
    const { showModalUpdateUser, setShowModalUpdateUser,
        dataUpdateUser, getAllUser,
        listRole } = props

    const handleClose = () => {
        setShowModalUpdateUser(false);
        setEmail('');
        setFirstName('');
        setLastName('');
        setPhoneNumber('');
        setAddress('');
        setImage('');
        setRole('');
        setPreviewImage('');
    }

    //state
    const [id, setId] = useState('')
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [image, setImage] = useState('');
    const [role, setRole] = useState('');
    const [previewImage, setPreviewImage] = useState('');
    useEffect(() => {
        if (!_.isEmpty(dataUpdateUser)) {
            setPreviewImage(dataUpdateUser.image);
            setId(dataUpdateUser.id);
            setEmail(dataUpdateUser.email);
            setFirstName(dataUpdateUser.firstName || '');
            setLastName(dataUpdateUser.lastName || '');
            setPhoneNumber(dataUpdateUser.phoneNumber || '');
            setAddress(dataUpdateUser.address || '');
            setImage(dataUpdateUser.image || '');
            setRole(dataUpdateUser.roleId || '');
        }
    }, [dataUpdateUser]);

    const handleUploadImage = async (event) => {
        if (event?.target?.files && event?.target?.files[0]) {
            let file = event.target.files[0];
            if (file) {
                let base64 = await CommonUtils.getBase64(file);
                let objectUrl = URL.createObjectURL(file);
                setPreviewImage(objectUrl);
                setImage(base64);

            }


        }
    };

    const handleSubmitUpdateUser = async () => {
        // Nếu không chọn ảnh mới, dùng lại ảnh cũ
        let imageToSend = image;
        if (!imageToSend) {
            imageToSend = dataUpdateUser.image;
        }
        let dataInput = {
            id,
            role,
            firstName,
            lastName,
            phoneNumber,
            address,
            image
        }
        let data = await putUpdateUser(dataInput);

        if (data.EC === 0) {
            toast.success(data.EM)
            await getAllUser()
            handleClose()
        }
        if (data && data.EC !== 0) {
            toast.error(data.EM)
        }
    };



    //  const handleOnchangeImage = async (event) => {
    //         let file = event.target.files[0];
    //         if (file) {
    //             let base64 = await CommonUtils.getBase64(file);
    //             let objectUrl = URL.createObjectURL(file);
    //             setState(prevState => ({
    //                 ...prevState,
    //                 previewImgUrl: objectUrl,
    //                 image: base64,
    //             }));
    //         }
    //     };
    return (
        <>
            <Modal
                show={showModalUpdateUser}
                onHide={handleClose}
                size="xl"
                backdrop="static"
                className="modal-add-user"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Update User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Email</label>
                            <input disabled type="email" className="form-control"
                                onChange={(event) => setEmail(event.target.value)}
                                value={email} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Password</label>
                            <input
                                disabled
                                type="password" className="form-control" value={'fafafaf'} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">First Name</label>
                            <input
                                onChange={(event) => setFirstName(event.target.value)}
                                type="text" className="form-control" value={firstName} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Last Name</label>
                            <input
                                onChange={(event) => setLastName(event.target.value)}
                                type="text" className="form-control" value={lastName} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Phone Number</label>
                            <input
                                onChange={(event) => setPhoneNumber(event.target.value)}
                                type="text" className="form-control" value={phoneNumber} />
                        </div>
                        <div className="col-md-12">
                            <label className="form-label">Address</label>
                            <input
                                onChange={(event) => setAddress(event.target.value)}
                                type="text" className="form-control" value={address} />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Role</label>
                            <select
                                value={role}
                                className="form-select"
                                onChange={(event) => setRole(event.target.value)}>
                                {listRole && listRole.length > 0 &&
                                    listRole.map((item, index) => (
                                        <option
                                            key={index}
                                            value={item.keyMap}>{item.valueVI}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className='col-md-12'>
                            <label className="form-label label-upload" htmlFor='upload-image'>
                                <FcAddImage size={'2em'} /> Upload File Image
                            </label>
                            <input
                                onChange={handleUploadImage}
                                id='upload-image' type='file' hidden ></input>
                        </div>
                        <div className='col-md-12 img-preview'>
                            {previewImage ?
                                <img src={previewImage} alt="User" style={{ maxWidth: 200, maxHeight: 200 }} />
                                :
                                <span>Preview Image</span>
                            }
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmitUpdateUser}>
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalUpdateUser;