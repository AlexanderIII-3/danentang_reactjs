import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcAddImage } from "react-icons/fc";
import { toast } from 'react-toastify';
import { putUpdateUser } from '../../../services/userService'
import _ from 'lodash';
const ModalUpdateUser = (props) => {
    const { showModalUpdateUser, setShowModalUpdateUser,
        dataUpdateUser,
        getUserPaginate, currentPage } = props

    const handleClose = () => {
        setShowModalUpdateUser(false);
        setEmail('');
        setUserName('');
        setImage('');
        setRole('');
        setPreviewImage('');
    }

    //state
    const [id, setId] = useState('')
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [image, setImage] = useState('');
    const [role, setRole] = useState('USER');
    const [previewImage, setPreviewImage] = useState('');
    // function

    useEffect(() => {
        if (!_.isEmpty(dataUpdateUser)) {
            let data = dataUpdateUser.image
            // check image

            if (data) {
                setPreviewImage(`${data}`);
            }

            // update state
            setId(dataUpdateUser.id);
            setEmail(dataUpdateUser.email);
            setUserName(dataUpdateUser.username);
            setImage('');
            setRole(dataUpdateUser.role);
        }
    }, [dataUpdateUser]);
    const handleUploadImage = (event) => {
        if (event?.target?.files && event?.target?.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]));
            setImage(event.target.files[0])

        }
    };


    const handleSubmitUpdateUser = async () => {


        //submit dât

        let data = await putUpdateUser(id, userName, role, image)


        if (data.EC === 0) {

            toast.success(data.EM)

            await getUserPaginate(currentPage)
            handleClose()

        }
        if (data && data.EC !== 0) {
            toast.error(data.EM)

        }




    };
    return (
        <>


            <Modal show={showModalUpdateUser}
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
                            <label className="form-label">Email</label>
                            <input disabled type="email" className="form-control"
                                onChange={(event) => setEmail(event.target.value, ...email)}

                                value={email} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Password</label>
                            <input
                                disabled
                                type="password" className="form-control" value={'fafafaf'} />
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
                                <option value='USER '>USER</option>
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
                    <Button variant="primary" onClick={handleSubmitUpdateUser}>
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalUpdateUser;