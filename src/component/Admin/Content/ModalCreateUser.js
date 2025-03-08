import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcAddImage } from "react-icons/fc";
import { toast } from 'react-toastify';
import { postCreateNewUser } from '../../../services/userService'
const ModalCreateUser = (props) => {
    const {
        showModalCreateUser, setShowModalCreateUser,
        getAllUser, currentPage,
        setCurrentPage, getUserPaginate } = props

    const handleClose = () => {
        setShowModalCreateUser(false);
        setEmail('');
        setPassword('');
        setUserName('');
        setImage('');
        setRole('');
        setPreviewImage('');
    }

    //state

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [image, setImage] = useState('');
    const [role, setRole] = useState('USER');
    const [previewImage, setPreviewImage] = useState('');
    // function
    const handleUploadImage = (event) => {
        if (event?.target?.files && event?.target?.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]));
            setImage(event.target.files[0])

        }
    };

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };
    const handleSubmitCreateUser = async () => {

        // validate email
        const isValidEmail = validateEmail(email);
        if (!isValidEmail) {
            toast.error('InValid Email!')
            return;
        }
        if (!password) {
            toast.error('InValid Password!')
        }

        //submit dât

        let data = await postCreateNewUser(email, password, userName, role, image)




        if (data && data.EC === 0) {
            toast.success(data.EM)
            handleClose()
            setCurrentPage(1)
            await getUserPaginate(1)
        }
        if (data && data.EC !== 0) {
            toast.error(data.EM)
        }
    };
    return (
        <>
            {/* <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button> */}

            <Modal show={showModalCreateUser}
                onHide={handleClose}
                size='xl'
                backdrop='static'
                className='modal-add-user'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add New User</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Email</label>
                            <input type="email" className="form-control"
                                onChange={(event) => setEmail(event.target.value, ...email)}

                                value={email} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Password</label>
                            <input
                                onChange={(event) => setPassword(event.target.value)}
                                type="password" className="form-control" value={password} />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">User name</label>
                            <input
                                onChange={(event) => setUserName(event.target.value)}
                                type="text" className="form-control" value={userName} />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Role</label>
                            <select
                                value={role}
                                className="form-select"
                                onChange={(event) => setRole(event.target.value)}>
                                <option value='ADMIN' >ADMIN</option>
                                <option>USER</option>
                            </select>
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



                    </form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmitCreateUser}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalCreateUser;