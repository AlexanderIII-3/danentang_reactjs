import React, { useState, useEffect } from "react";
import { handleCreateNextReExam, handleDeletReExam, handleUpdateReExamService, handleGetPendingReExams, handleUpdateFollowUp, } from "../../../services/userService";
import { useSelector } from "react-redux";
import ResultModal from "./ResultModal";
import { toast } from "react-toastify";
import { sendRemedyApi } from "../../../services/userService";
import { set } from "nprogress";
import CreateReExamModal from "./CreateReExamModal";
import { result } from "lodash";
import UpdateReExamModal from "./UpdateReExamModal";

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
    const [dataModalUpdateReExam, setDataModalUpdateReExam] = useState({});
    const [dataModal, setDataModal] = useState({});
    const [isOpenRemedyModel, setIsOpenRemedyModel] = useState(false);
    const [isOpenUpdateReExam, setIsOpenUpdateReExam] = useState(false);
    const account = useSelector(state => state.userInfo.account)
    const [dateNow, setDateNow] = useState(() => {
        const now = new Date();
        now.setHours(0, 0, 0, 0);
        return now.getTime();
    });
    const [isDate, setIsDate] = useState(false);
    // Đặt thời gian về 0h00

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
    const handleCompareDate = (dateNow, dateBooking) => {
        const date1 = new Date(dateNow);
        const date2 = new Date(+dateBooking);
        date1.setHours(0, 0, 0, 0);
        date2.setHours(0, 0, 0, 0);
        return date1.getTime() === date2.getTime();
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

    const updateReExam = async (data) => {
        const dateString = data.nextDate;
        const timestamp = new Date(dateString).getTime();

        let dataReExam = {
            id: dataModalUpdateReExam.id,
            date: timestamp,
            reason: data.reason,
            result: data.examResult,

        }
        setLoading(true);
        const res = await handleUpdateReExamService(dataReExam);
        console.log("check res", res)
        if (res && res.EC === 0) {
            toast.success(res.EM);
            await fetchPending();
            setIsOpenCreateReExam(false);
        } else {
            toast.error(res.EM);
        }
        setLoading(false);
    }
    const handleCreateReExam = (data) => {
        setDataModalReExam(data);
        setIsOpenCreateReExam(true);
    }
    const handleUpdateReExam = (data) => {
        console.log("check data", data)
        setDataModalUpdateReExam(data);
        setIsOpenUpdateReExam(true);

    }
    const handleDeleteReExam = async (item) => {
        setLoading(true);
        try {
            const data = {
                token: item.token,
                date: item.date
            }
            const res = await handleDeletReExam(data);
            if (res && res.EC === 0) {
                toast.success("Xoá lịch tái khám thành công");
                await fetchPending();
            } else {
                toast.error(res.EM);
            }
        } catch (error) {
            toast.error("Xoá lịch tái khám thất bại");
            console.error(error);
        } finally {
            setLoading(false);
        }

    }
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
                                    {handleCompareDate(dateNow, item.date) ?
                                        <td className="border px-3 py-2 space-x-2">
                                            <button
                                                onClick={() => handleConfirmBooking(item)}
                                                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                                            >
                                                Nhập kết quả
                                            </button>
                                            <button
                                                onClick={() => handleCreateReExam(item)}
                                                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                                            >
                                                Tạo lịch tái khám mới
                                            </button>
                                        </td>
                                        :
                                        <td className="border px-3 py-2 text-gray-400 text-center">
                                            <button
                                                onClick={() => handleDeleteReExam(item)}
                                                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                                            >
                                                Xoá
                                            </button>
                                            <button
                                                onClick={() => handleUpdateReExam(item)}
                                                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                                            >
                                                Sửa
                                            </button>
                                        </td>
                                    }


                                </tr>
                            ))}

                        </tbody>
                    </table>

                    <hr className="my-6" />


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
            <UpdateReExamModal
                isOpen={isOpenUpdateReExam}
                closeModal={() => setIsOpenUpdateReExam(false)}
                updateReExam={updateReExam}
                data={dataModalUpdateReExam}
            />
        </div>
    );
};

export default ReExamManagement;
