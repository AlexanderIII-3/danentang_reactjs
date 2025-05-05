import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

class PatientInfoModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            weight: '',
            height: '',
            bloodType: 'A',
        };
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    onSubmit = () => {
        const { weight, height, bloodType } = this.state;
        let { dataPatientModal } = this.props;
        if (!weight || !height) {
            alert('Vui lòng nhập đủ cân nặng và chiều cao');
            return;
        }

        this.props.handleSave({
            weight: parseFloat(weight),
            height: parseFloat(height),
            bloodType,
            actor: 'DOCTOR',
            patientId: dataPatientModal?.patienId,
            patientName: dataPatientModal?.patientData?.lastName + ' ' + dataPatientModal?.patientData?.firstName,
            date: dataPatientModal?.date,
        });

        // Reset form & đóng modal
        this.setState({
            weight: '',
            height: '',
            bloodType: 'A',
        });

    };

    render() {
        const { show, onClose, handleSave } = this.props;
        const { weight, height, bloodType } = this.state;

        return (
            <Modal show={show} onHide={onClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Nhập thông tin bệnh nhân</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formWeight">
                            <Form.Label>Cân nặng (kg)</Form.Label>
                            <Form.Control
                                type="number"
                                name="weight"
                                value={weight}
                                onChange={this.handleChange}
                                placeholder="VD: 60"
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formHeight" className="mt-3">
                            <Form.Label>Chiều cao (cm)</Form.Label>
                            <Form.Control
                                type="number"
                                name="height"
                                value={height}
                                onChange={this.handleChange}
                                placeholder="VD: 170"
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formBloodType" className="mt-3">
                            <Form.Label>Nhóm máu</Form.Label>
                            <Form.Select
                                name="bloodType"
                                value={bloodType}
                                onChange={this.handleChange}
                            >
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="AB">AB</option>
                                <option value="O">O</option>
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onClose}>
                        Huỷ
                    </Button>
                    <Button variant="primary" onClick={this.onSubmit}>
                        Lưu
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default PatientInfoModal;
