import React from 'react';
import { Modal, Button } from 'react-bootstrap';

class CancelAppointmentConfirmModal extends React.Component {
    render() {
        const { show, onClose, onConfirm, dataCancel } = this.props;

        return (
            <Modal show={show} onHide={onClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Xác nhận hủy cuộc hẹn</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Bạn có chắc chắn muốn hủy cuộc hẹn này không?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onClose}>
                        Hủy
                    </Button>
                    <Button variant="danger" onClick={() => { onConfirm(dataCancel) }}>
                        Xác nhận
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default CancelAppointmentConfirmModal;