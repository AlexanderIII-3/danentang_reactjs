import React, { useState, useEffect } from "react";
import { handleCreateNextReExam, handleGetPendingReExams, handleUpdateFollowUp } from "../../../services/userService";
import { useSelector } from "react-redux";
import ResultModal from "./ResultModal";
import { toast } from "react-toastify";
import { sendRemedyApi } from "../../../services/userService";
import { set } from "nprogress";
import CreateReExamModal from "./CreateReExamModal";
import { result } from "lodash";

// import {
//     handleGetPendingReExams,
//     handleSubmitReExamResult,
//     handleCreateNextReExam,
// } from "../../../services/reExamService";

const ReExamManagement = () => {
    const [pendingReExams, setPendingReExams] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isOpenCreateReExam, setIsOpenCreateReExam] = useState(false);
    const [dataModalReExam, setDataModalReExam] = useState({});
    const [dataModal, setDataModal] = useState({});
    const [isOpenRemedyModel, setIsOpenRemedyModel] = useState(false);
    // Form tạo lịch tái khám tiếp theo
    const [nextDate, setNextDate] = useState("");
    const [nextReason, setNextReason] = useState("");
    const [patientEmailForNext, setPatientEmailForNext] = useState("");
    const account = useSelector(state => state.userInfo.account)
    const fetchPending = async () => {
        setLoading(true);
        try {
            const res = await handleGetPendingReExams(account.id);
            setPendingReExams(res.DT || []);
        } catch (error) {
            alert("Không tải được danh sách tái khám");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    const convertTimestampToDateString = (timestamp) => {
        const ts = Number(timestamp);
        if (isNaN(ts)) return '';
        const date = new Date(ts);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    const handleConfirmBooking = (item) => {
        let patientname = (item?.User.firstName || '') + (item?.User.lastName || '');

        let data = {

            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.patientEmail,
            patientName: patientname,
            timeType: item.followupData.timeType,
            reason: item.reason,
            date: item.date,
            token: item.token,
        }
        setIsOpenRemedyModel(true);
        setDataModal(data)


    };

    // handle submit final result


    const closeRemedyModal = () => {
        setIsOpenRemedyModel(false);
    };
    const sendRemedy = async (data) => {
        let doctorname = account.firstName + " " + account.lastName
        setLoading(true);

        let res = await sendRemedyApi({
            email: dataModal.email,
            doctorId: dataModal.doctorId,
            doctorname: doctorname,
            patientId: dataModal.patientId,
            timeType: dataModal.timeType,
            patientName: dataModal.patientName,
            reason: dataModal.reason,
            date: dataModal.date,
            token: dataModal.token,
            result: data.result,
            prescription: data.prescription,
            note: data.note,
        })

        if (res && res.EC === 0) {
            setLoading(false);
            toast.success("Send Remedy Success!")

            let data = await handleUpdateFollowUp(dataModal.token)
            if (data && data.EC === 0) {
                toast.success(data.EM)
            } else {
                toast.error(data.EM)
            }
            await fetchPending();
            closeRemedyModal();

        } else {
            toast.error("Send Remedy Error!")
        }
    };



    const createReExam = async (data) => {
        const dateString = data.nextDate;
        const timestamp = new Date(dateString).getTime();

        let dataReExam = {

            patientEmail: data.patientEmail,
            date: timestamp,
            reason: data.reason,
            result: data.examResult,
            token: dataModalReExam.token,
            doctorId: dataModalReExam.doctorId,
            patientId: dataModalReExam.patientId,
        }
        setLoading(true);
        const res = await handleCreateNextReExam(dataReExam);
        console.log("check res", res)
        if (res && res.EC === 0) {
            toast.success(res.EM);
            await fetchPending();
            setIsOpenCreateReExam(false);
        } else {
            toast.error(res.EM);
        }
        setLoading(false);
    };
    const handleCreateReExam = (data) => {
        console.log("check data", data)
        setDataModalReExam(data);
        setIsOpenCreateReExam(true);
    }

    const createNextReExam = async () => {
        if (!patientEmailForNext || !nextDate || !nextReason) {
            alert("Nhập đầy đủ thông tin tạo lịch tái khám tiếp theo");
            return;
        }
        try {

            const res = await handleCreateNextReExam({
                patientEmail: patientEmailForNext,
                nextDate,
                reason: nextReason,
            });
            if (res.EC === 0) {
                alert("Tạo lịch tái khám tiếp theo thành công");
                setNextDate("");
                setNextReason("");
                setPatientEmailForNext("");
                fetchPending();
            } else {
                alert("Tạo lịch tái khám thất bại");
            }
        } catch (error) {
            alert("Lỗi khi tạo lịch tái khám");
            console.error(error);
        }
    };

    useEffect(() => {
        fetchPending();
    }, []);

    return (
        <div className="max-w-5xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6">Quản lý lịch tái khám</h2>

            {loading ? (
                <p>Đang tải danh sách tái khám...</p>
            ) : (
                <>
                    <table className="w-full border text-sm mb-6">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border px-3 py-2">Email bệnh nhân</th>
                                <th className="border px-3 py-2">Ngày tái khám</th>
                                <th className="border px-3 py-2">Lý do tái khám</th>
                                <th className="border px-3 py-2">Kết quả khám</th>
                                <th className="border px-3 py-2">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pendingReExams.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="text-center py-4">
                                        Không có lịch tái khám chờ xử lý
                                    </td>
                                </tr>
                            )}
                            {pendingReExams.map((item) => (
                                <tr key={item.id}>
                                    <td className="border px-3 py-2">{item.patientEmail}</td>
                                    <td className="border px-3 py-2">{convertTimestampToDateString(item.date)}</td>
                                    <td className="border px-3 py-2">{item.reason}</td>
                                    <td className="border px-3 py-2"> {item.result} </td>

                                    <td className="border px-3 py-2 space-x-2">

                                        <button
                                            onClick={() => {
                                                handleConfirmBooking(item);
                                            }}
                                            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                                        >
                                            Nhập kết quả
                                        </button>

                                        <button
                                            onClick={() => handleCreateReExam(item)}
                                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                                        >
                                            Tạo lịch tái khám mới
                                        </button>

                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>

                    <hr className="my-6" />

                    <h3 className="text-xl font-semibold mb-4">Tạo lịch tái khám tiếp theo</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-lg">
                        <input
                            type="email"
                            placeholder="Email bệnh nhân"
                            value={patientEmailForNext}
                            onChange={(e) => setPatientEmailForNext(e.target.value)}
                            className="border px-3 py-2 rounded"
                        />
                        <input
                            type="date"
                            value={nextDate}
                            onChange={(e) => setNextDate(e.target.value)}
                            className="border px-3 py-2 rounded"
                        />
                        <input
                            type="text"
                            placeholder="Lý do tái khám"
                            value={nextReason}
                            onChange={(e) => setNextReason(e.target.value)}
                            className="border px-3 py-2 rounded"
                        />
                        <button
                            onClick={() => setIsOpenCreateReExam(true)}
                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                        >
                            Tạo lịch tái khám mới
                        </button>
                    </div>
                </>
            )}
            <ResultModal
                isOpen={isOpenRemedyModel}
                closeRemedyModal={closeRemedyModal}
                sendRemedy={sendRemedy}
            />
            <CreateReExamModal
                isOpen={isOpenCreateReExam}
                closeModal={() => setIsOpenCreateReExam(false)}
                createReExam={createReExam}
                data={dataModalReExam}
            />
        </div>
    );
};

export default ReExamManagement;
