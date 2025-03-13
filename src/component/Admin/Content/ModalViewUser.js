import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import _ from 'lodash';

import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    MDBBreadcrumb,
    MDBBreadcrumbItem,

} from 'mdb-react-ui-kit';
const ModalViewUser = (props) => {

    const { show, setShow, dataViewUser, refeshDetailUser } = props;
    const [username, setUserName] = useState('')
    const [role, setRole] = useState('');
    const [previewImage, setPreviewImage] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [position, setPosition] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')


    const handleClose = () => {
        setShow(false)
        refeshDetailUser()
    };
    useEffect(() => {
        if (!_.isEmpty(dataViewUser)) {
            let data = dataViewUser.image

            if (data) {


                setPreviewImage(data);
            }

            setEmail(dataViewUser.email);
            setUserName(dataViewUser.firstName + " " + dataViewUser.lastName);
            setAddress(dataViewUser.address)
            setPhoneNumber(dataViewUser.phoneNumber)
            setPosition(dataViewUser.position)
            setRole(dataViewUser.roleId);


        }

    }, [dataViewUser]);
    return (
        <>


            <Modal
                size='xl'
                backdrop='static'
                show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Information of user : {email}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <section style={{ backgroundColor: '#eee' }}>
                        <MDBContainer className="py-5">
                            <MDBRow>
                                <MDBCol>
                                    <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">

                                        <MDBBreadcrumbItem active>User Profile</MDBBreadcrumbItem>
                                    </MDBBreadcrumb>
                                </MDBCol>
                            </MDBRow>

                            <MDBRow>
                                <MDBCol lg="4">
                                    <MDBCard className="mb-4">
                                        <MDBCardBody className="text-center">
                                            <MDBCardImage
                                                src={previewImage ? previewImage : ''}
                                                alt="avatar"
                                                // className="rounded-circle"
                                                style={{ width: '350px', height: '300px' }}
                                                fluid />
                                            <p className="text-muted mb-1">User : {username ? username : ''}</p>

                                        </MDBCardBody>
                                    </MDBCard>


                                </MDBCol>
                                <MDBCol lg="8">
                                    <MDBCard className="mb-4">
                                        <MDBCardBody>
                                            <MDBRow>
                                                <MDBCol sm="3">
                                                    <MDBCardText>Full Name:</MDBCardText>
                                                </MDBCol>
                                                <MDBCol sm="9">
                                                    <MDBCardText className="text-muted">{username ? username : ''}</MDBCardText>
                                                </MDBCol>
                                            </MDBRow>
                                            <hr />
                                            <MDBRow>
                                                <MDBCol sm="3">
                                                    <MDBCardText>Email:</MDBCardText>
                                                </MDBCol>
                                                <MDBCol sm="9">
                                                    <MDBCardText className="text-muted">{email ? email : ''}</MDBCardText>
                                                </MDBCol>
                                            </MDBRow>







                                            <hr />
                                            <MDBRow>
                                                <MDBCol sm="3">
                                                    <MDBCardText>Address:</MDBCardText>
                                                </MDBCol>
                                                <MDBCol sm="9">
                                                    <MDBCardText className="text-muted">{address ? address : ''}</MDBCardText>
                                                </MDBCol>
                                            </MDBRow>


                                            <hr />
                                            <MDBRow>
                                                <MDBCol sm="3">
                                                    <MDBCardText>Phone Number:</MDBCardText>
                                                </MDBCol>
                                                <MDBCol sm="9">
                                                    <MDBCardText className="text-muted">{phoneNumber ? phoneNumber : ''}</MDBCardText>
                                                </MDBCol>
                                            </MDBRow>


                                            <hr />
                                            <MDBRow>
                                                <MDBCol sm="3">
                                                    <MDBCardText>Role:</MDBCardText>
                                                </MDBCol>
                                                <MDBCol sm="9">
                                                    <MDBCardText className="text-muted">{role ? role : ''}</MDBCardText>
                                                </MDBCol>
                                            </MDBRow>
                                            <hr />
                                            <MDBRow>
                                                <MDBCol sm="3">
                                                    <MDBCardText>Positon:</MDBCardText>
                                                </MDBCol>
                                                <MDBCol sm="9">
                                                    <MDBCardText className="text-muted">{position ? position : ''}</MDBCardText>
                                                </MDBCol>
                                            </MDBRow>



                                        </MDBCardBody>
                                    </MDBCard>


                                </MDBCol>
                            </MDBRow>
                        </MDBContainer>
                    </section>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>

                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalViewUser;