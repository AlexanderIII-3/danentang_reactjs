import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import { format } from 'date-fns';

const CreateReExamModal = ({ isOpen, closeModal, createReExam, data }) => {
    const [nextDate, setNextDate] = useState("");
    const [nextReason, setNextReason] = useState("");
    const [examResult, setExamResult] = useState("");
    const [errors, setErrors] = useState({});

    // Format previous exam date (chỉ hiển thị ngày)
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

        if (!examResult) newErrors.examResult = "Vui lòng nhập kết quả khám";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (!validateForm()) return;

        createReExam({
            patientId: data.patientId,
            patientEmail: data.patientEmail, // Lấy từ dữ liệu cũ
            nextDate: nextDate,
            reason: nextReason,
            examResult: examResult, // Kết quả khám mới
            previousExamId: data.id
        });
    };

    const today = format(new Date(), 'yyyy-MM-dd');

    return (
        <Modal
            show={isOpen}
            onHide={closeModal}
            backdrop='static'
            centered
            size="xxl"
            aria-labelledby="create-reexam-modal"
        >
            <Modal.Header closeButton className="border-b-0 pb-0">
                <Modal.Title className="text-xl font-bold text-gray-800">
                    Đặt lịch tái khám
                </Modal.Title>
            </Modal.Header>

            <Modal.Body className="pt-0">
                <div className="space-y-4">
                    {/* Thông tin bệnh nhân (tự động điền) */}
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

                    {/* Form nhập thông tin tái khám */}
                    <div className="space-y-4 mt-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Ngày tái khám <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="date"
                                value={nextDate}
                                min={today}
                                onChange={(e) => setNextDate(e.target.value)}
                                className={`block w-full px-3 py-2 border ${errors.nextDate ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                            />
                            {errors.nextDate && <p className="mt-1 text-sm text-red-600">{errors.nextDate}</p>}
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
                            {errors.nextReason && <p className="mt-1 text-sm text-red-600">{errors.nextReason}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Kết quả khám hiện tại <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                value={examResult}
                                onChange={(e) => setExamResult(e.target.value)}
                                rows={3}
                                className={`block w-full px-3 py-2 border ${errors.examResult ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                                placeholder="Nhập kết quả khám hiện tại"
                            />
                            {errors.examResult && <p className="mt-1 text-sm text-red-600">{errors.examResult}</p>}
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
                    className="ml-3 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Xác nhận tái khám
                </button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateReExamModal;