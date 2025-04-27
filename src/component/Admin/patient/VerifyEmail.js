import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { postVerifyBookingAppointment } from "../../../services/userService";
import './VerifyEmail.scss';

const VerifyEmail = () => {
    const location = useLocation();
    const [statusVerify, setStatusVerify] = useState(false);
    const [errorCode, setErrorCode] = useState(0);

    useEffect(() => {
        const verifyAppointment = async () => {
            if (location && location.search) {
                const urlParams = new URLSearchParams(location.search);
                const token = urlParams.get('token');
                const doctorId = urlParams.get('doctorId');


                const res = await postVerifyBookingAppointment({
                    token,
                    doctorId
                });

                if (res && res.EC === 0) {
                    setStatusVerify(true);
                    setErrorCode(res.EC);
                } else {
                    setStatusVerify(true);
                    setErrorCode(res?.EC || -1);
                }
            }
        };

        verifyAppointment();
    }, [location]);

    return (
        <>
            {/* <HomeHeader /> */}
            <div className='verify-email-container'>
                {!statusVerify ? (
                    <div className='verify-loading'>Trong quá trình tải....</div>
                ) : (
                    <div>
                        {errorCode === 0 ? (
                            <div className='infor-booking'>Xác nhận lịch hẹn thành công !</div>
                        ) : (
                            <div className='infor-booking'>Lịch hẹn không tồn tại!</div>
                        )}
                    </div>
                )}
            </div>
        </>
    );
};

export default VerifyEmail;
