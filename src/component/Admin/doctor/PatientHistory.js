import React, { useState, useEffect } from "react";
import { handleGetHistoryPatient } from "../../../services/userService";

const PatientHistory = () => {
    const [patientEmail, setPatientEmail] = useState("");
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [previewPdf, setPreviewPdf] = useState(null);
    const [previewTitle, setPreviewTitle] = useState("");

    const fetchHistory = async () => {
        if (!patientEmail.trim()) return alert("Vui lòng nhập email bệnh nhân");
        setLoading(true);
        try {
            const res = await handleGetHistoryPatient(patientEmail);
            setHistory(res.DT || []);
            setPreviewPdf(null);
        } catch (err) {
            alert("Không thể tải lịch sử khám");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Format timestamp -> DD/MM/YYYY


    // Base64 -> Data URI
    const toPdfDataUri = (b64) => `data:application/pdf;base64,${b64}`;

    // Handle preview click
    const handlePreview = (b64, idx) => {
        setPreviewPdf(toPdfDataUri(b64));
        setPreviewTitle(`Preview PDF #${idx + 1}`);
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Lịch sử khám bệnh</h2>
            <div className="flex gap-4 mb-4">
                <input
                    type="text"
                    placeholder="Nhập email bệnh nhân"
                    value={patientEmail}
                    onChange={(e) => setPatientEmail(e.target.value)}
                    className="border rounded px-4 py-2 flex-1"
                />
                <button
                    onClick={fetchHistory}
                    className="bg-blue-100 text-blue-600 px-3 py-1 rounded-md hover:bg-blue-200 transition"
                >
                    Tìm kiếm
                </button>
            </div>

            {loading && <p>Đang tải dữ liệu...</p>}

            {/* Preview Section */}
            {previewPdf && (
                <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-2">{previewTitle}</h3>
                    <div className="border">
                        <iframe
                            src={previewPdf}
                            width="100%"
                            height="700px"
                            title={previewTitle}
                        />
                    </div>
                    <button
                        onClick={() => setPreviewPdf(null)}
                        className="mt-2 px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                        Đóng xem trước
                    </button>
                </div>
            )}

            {!loading && history.length === 0 && <p>Chưa có dữ liệu.</p>}

            {history.length > 0 && (
                <table className="w-full border text-sm">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border px-3 py-2">Ngày khám</th>
                            <th className="border px-3 py-2">Bác sĩ</th>
                            <th className="border px-3 py-2">Email bệnh nhân</th>
                            <th className="border px-3 py-2">Chuẩn đoán</th>
                            <th className="border px-3 py-2">Lý do khám</th>
                            <th className="border px-3 py-2">Kết quả khám</th>
                        </tr>
                    </thead>
                    <tbody>
                        {history.map((item, idx) => (
                            <tr key={idx}>
                                <td className="border px-3 py-2">{(item.date)}</td>
                                <td className="border px-3 py-2">
                                    {item.doctor.lastName} {item.doctor.firstName}
                                </td>
                                <td className="border px-3 py-2">{item.patientEmail}</td>
                                <td className="border px-3 py-2">{item.result}</td>
                                <td className="border px-3 py-2">{item.reason}</td>
                                <td className="border px-3 py-2 text-center">
                                    <button
                                        onClick={() => handlePreview(item.files, idx)}
                                        className="bg-blue-100 text-blue-600 px-3 py-1 rounded-md hover:bg-blue-200 transition"
                                    >
                                        Xem trước
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default PatientHistory;
