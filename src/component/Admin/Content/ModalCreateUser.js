import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcAddImage } from "react-icons/fc";
import { toast } from 'react-toastify';
import { postCreateNewUser } from '../../../services/userService'
// import CommonUtils from '../../../utils'
const ModalCreateUser = (props) => {
    const {
        showModalCreateUser, setShowModalCreateUser,
        getAllUser, currentPage,
        setCurrentPage, getUserPaginate } = props

    const handleClose = () => {
        setShowModalCreateUser(false);
        setEmail('');
        setPassword('');
        setUserfName('');
        setUserlName('');
        setImage('');
        setRole('');
        setPreviewImage('');
    }

    //state

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userfName, setUserfName] = useState('');
    const [userlName, setUserlName] = useState('');
    const [image, setImage] = useState('');
    const [role, setRole] = useState('USER');
    const [previewImage, setPreviewImage] = useState('');

    const [address, setAddress] = useState('');
    const [gender, setGender] = useState('');
    const [position, setPosition] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('')
    // function
    const handleUploadImage = async (event) => {
        if (event?.target?.files && event?.target?.files[0]) {



            setPreviewImage(URL.createObjectURL(event.target.files[0]));

            let getBase64 = (file) => {
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = () => resolve(reader.result);
                    reader.onerror = error => reject(error);
                });
            }



            let data = event.target.files;
            let file = data[0];
            let base64 = await getBase64(file);

            setImage(base64)

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

        let data = await postCreateNewUser(email, password, userfName, userlName, role, image, gender, position, address, phoneNumber)




        if (data.user && data.user.EC === 0) {
            toast.success(data.user.EM)
            handleClose()
            setCurrentPage(1)
            await getAllUser()
        }
        if (data.user && data.user.EC !== 0) {
            toast.error(data.user.EM)
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
                            <label className="form-label">First Name</label>
                            <input
                                onChange={(event) => setUserfName(event.target.value)}
                                type="text" className="form-control" value={userfName} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">lastName</label>
                            <input
                                onChange={(event) => setUserlName(event.target.value)}
                                type="text" className="form-control" value={userlName} />
                        </div>


                        <div className="col-md-6">
                            <label className="form-label">Address</label>
                            <input
                                onChange={(event) => setAddress(event.target.value)}
                                type="text" className="form-control" value={address} />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Phone Number</label>
                            <input
                                onChange={(event) => setPhoneNumber(event.target.value)}
                                type="text" className="form-control" value={phoneNumber} />
                        </div>


                        <div className="col-md-4">
                            <label className="form-label">Role</label>
                            <select
                                value={role}
                                className="form-select"
                                onChange={(event) => setRole(event.target.value)}>
                                <option value='ADMIN' >ADMIN</option>
                                <option>USER</option>
                                <option>PATIENT</option>

                            </select>
                        </div>

                        <div className="col-md-4">
                            <label className="form-label">Position</label>
                            <select
                                value={position}
                                className="form-select"
                                onChange={(event) => setPosition(event.target.value)}>
                                <option value='P2' >Doctor</option>
                                <option>Patient</option>
                            </select>
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Gender</label>
                            <select
                                value={gender}
                                className="form-select"
                                onChange={(event) => setGender(event.target.value)}>
                                <option value='MALE' >MALE</option>
                                <option>FEMALE</option>
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