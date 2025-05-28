import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import './FollowUpModal.scss';
import "react-datepicker/dist/react-datepicker.css";

const FollowUpModal = ({ show, onClose, onSave, dataPatient }) => {
    const [date, setDate] = useState(new Date());
    const [reason, setReason] = useState('');
    const handleSave = () => {
        if (!date || !reason.trim()) {
            alert('Vui lòng nhập đầy đủ thông tin!');
            return;
        }
        onSave({
            date: date.getTime(),
            reason,
            patientId: dataPatient.patienId,
            doctorId: dataPatient.doctorId,
            statusId: dataPatient.statusId,
            token: dataPatient.token,
            patientEmail: dataPatient?.patientData.email,
        });
    };

    if (!show) return null;

    return (
        <div className='modal-overlay'>
            <div className='modal-content'>
                <h4>Hẹn lịch tái khám</h4>
                <label>Chọn ngày tái khám:</label>
                <DatePicker
                    selected={date}
                    onChange={setDate}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={30}
                    dateFormat="dd/MM/yyyy HH:mm"
                    minDate={new Date()}
                />
                <label>Lý do tái khám:</label>
                <textarea value={reason} onChange={(e) => setReason(e.target.value)} />


                <div className='modal-actions'>
                    <button onClick={onClose}>Huỷ</button>
                    <button onClick={handleSave}>Lưu</button>
                </div>
            </div>
        </div>
    );
};

export default FollowUpModal;
