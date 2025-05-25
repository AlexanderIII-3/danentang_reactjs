// components/ResultModal.jsx
import React, { Component } from 'react';
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from 'react-toastify';
class ResultModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            result: "",
            prescription: "",
            note: ''

        }



    }
    handleCloseModal = () => {
        let { isOpen, closeRemedyModal } = this.props;
        closeRemedyModal();



    }
    handleOnChangeInput = (event, id) => {

        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }

    handleSave = () => {
        let { result, prescription, note } = this.state;
        let { dataModal, sendRemedy } = this.props;
        if (!result || !prescription) {
            toast.error('Vui lòng nhập kết quả khám và đơn thuốc!');
            return;
        }
        let data = {

            result: result,
            prescription: prescription,
            note: note
        }

        sendRemedy(data);
        this.handleCloseModal();
    }
    render() {
        let { isOpen, closeRemedyModal } = this.props;

        // onSave = () => {
        //     handleSave({ result, prescription });
        //     closeRemedyModal();
        //     setResult("");
        //     setPrescription("");
        // };

        return (
            <Modal show={isOpen} onHide={this.handleCloseModal}>



                <Modal.Header >
                    <Modal.Title>Nhập kết quả khám & đơn thuốc</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formResult" className="mb-3">
                            <Form.Label>Kết quả khám</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Nhập kết quả khám..."
                                value={this.state.result}



                                onChange={(e) => this.handleOnChangeInput(e, 'result')}
                            />
                        </Form.Group>

                        <Form.Group controlId="formPrescription" className="mb-3">
                            <Form.Label>Đơn thuốc</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Nhập đơn thuốc..."
                                value={this.state.prescription}
                                onChange={(e) => this.handleOnChangeInput(e, 'prescription')}
                            />
                        </Form.Group>


                        <Form.Group controlId="formPrescription" className="mb-3">
                            <Form.Label>Lưu ý:</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Nhập lưu ý..."
                                value={this.state.note}
                                onChange={(e) => this.handleOnChangeInput(e, 'note')}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => this.handleCloseModal()}>
                        Hủy
                    </Button>
                    <Button
                        onClick={() => this.handleSave()}
                        variant="primary">
                        Lưu
                    </Button   >
                </Modal.Footer>
            </Modal>
        );
    }
}
export default ResultModal;