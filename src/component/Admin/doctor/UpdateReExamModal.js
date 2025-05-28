import React, { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import { format } from 'date-fns';

const UpdateReExamModal = ({ isOpen, closeModal, updateReExam, data }) => {
    console.log("UpdateReExamModal data:", data);
    const [nextDate, setNextDate] = useState("");
    const [nextReason, setNextReason] = useState("");
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (data) {
            setNextDate(data.nextDate ? format(new Date(Number(data.nextDate)), 'yyyy-MM-dd') : "");
            setNextReason(data.reason || "");
        }
    }, [data, isOpen]);

    const formatExamDate = (timestamp) => {
        if (!timestamp) return '';
        const date = new Date(Number(timestamp));
        return format(date, 'dd/MM/yyyy');
    };

    const validateForm = () => {
        const newErrors = {};
        if (!nextDate) newErrors.nextDate = "Vui lòng chọn ngày tái khám";
        else if (new Date(nextDate) < new Date()) newErrors.nextDate = "Ngày tái khám phải trong tương lai";
        if (!nextReason) newErrors.nextReason = "Vui lòng nhập lý do tái khám";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;
        setIsSubmitting(true);
        try {
            await updateReExam({
                id: data.id, // id lịch tái khám cần update
                patientId: data.patientId,
                patientEmail: data.patientEmail,
                nextDate,
                reason: nextReason,
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const tomorrow = format(new Date(Date.now() + 24 * 60 * 60 * 1000), 'yyyy-MM-dd');

    return (
        <Modal
            show={isOpen}
            onHide={closeModal}
            backdrop='static'
            centered
            size="xl"
            aria-labelledby="update-reexam-modal"
        >
            <Modal.Header closeButton className="border-b-0 pb-0">
                <Modal.Title className="text-xl font-bold text-gray-800">
                    Cập nhật lịch tái khám
                </Modal.Title>
            </Modal.Header>

            <Modal.Body className="pt-0 animate-fadeIn">
                <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                        <h3 className="font-medium text-gray-800 mb-2">Thông tin bệnh nhân</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-gray-500">Email</p>
                                <p className="font-medium">{data.patientEmail}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Ngày khám trước</p>
                                <p className="font-medium">{formatExamDate(data.date)}</p>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-4 mt-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Ngày tái khám <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="date"
                                value={nextDate}
                                min={tomorrow}
                                onChange={(e) => setNextDate(e.target.value)}
                                className={`block w-full px-3 py-2 border ${errors.nextDate ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                            />
                            {nextDate && (
                                <p className="text-sm text-green-600 mt-1">Bạn đã chọn: {format(new Date(nextDate), 'dd/MM/yyyy')}</p>
                            )}
                            {errors.nextDate && (
                                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                                    <span className="material-icons text-base">error_outline: </span>
                                    {errors.nextDate}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Lý do tái khám <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={nextReason}
                                onChange={(e) => setNextReason(e.target.value)}
                                className={`block w-full px-3 py-2 border ${errors.nextReason ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                                placeholder="Nhập lý do tái khám"
                            />
                            {errors.nextReason && (
                                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                                    <span className="material-icons text-base">error_outline</span>
                                    {errors.nextReason}
                                </p>
                            )}
                        </div>

                    </div>
                </div>
            </Modal.Body>

            <Modal.Footer className="border-t-0 pt-0">
                <button
                    onClick={closeModal}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Hủy bỏ
                </button>
                <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className={`ml-3 px-4 py-2 text-sm font-medium text-white ${isSubmitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                >
                    {isSubmitting ? 'Đang cập nhật...' : 'Cập nhật'}
                </button>
            </Modal.Footer>
        </Modal>
    );
};

export default UpdateReExamModal;