import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteUser } from "../../../services/userService";
import { toast } from 'react-toastify';

const ModalDeleteUser = (props) => {

    const {
        show, setShow,
        dataDelete, getUserPaginate, getAllUser,

        setCurrentPage, currentPage
    } = props;



    const handleClose = () => setShow(false);
    const handleSubmitDeleteUser = async () => {
        let res = await deleteUser(dataDelete.id);
        if (res && res.EC === 0) {
            toast.success(res.EM)
            handleClose();
            // setCurrentPage(1);
            await getAllUser()

        } if (res && res.EC !== 0) {
            toast.error(res.EM)
        }

    }
    return (
        <>


            <Modal show={show}
                onHide={handleClose}
                backdrop='static'

            >
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete User?</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you wana to delete user: <b>{dataDelete && dataDelete.email ? dataDelete.email : ''}</b>  ?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancle
                    </Button>
                    <Button

                        variant="primary"

                        onClick={() => { handleSubmitDeleteUser() }}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteUser;