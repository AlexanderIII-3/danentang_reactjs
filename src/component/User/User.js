import React, { useEffect, useState } from 'react';
import HomeHeader from '../User/container/HomeHeader';
import HomeFooter from '../User/container/HomeFooter';
import Specialty from '../User/container/section/Specialty';
import MedicalFacility from '../User/container/section/MedicalFacility';
import HandBook from '../User/container/section/HandBook';
import OutStandingDoctor from '../User/container/section/OutStandingDoctor';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { FetchAllDoctor } from '../../services/userService'
import _ from 'lodash';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const User = () => {
    //Manage State
    const [doctorArr, setDoctorArr] = useState([])
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,

    };

    useEffect(() => {
        fetchDoctor()
    }, [])
    console.log('check doctor ', doctorArr)

    const fetchDoctor = async () => {
        let doctor = await FetchAllDoctor()
        setDoctorArr(doctor.DT)
    }

    useEffect(() => {
        if (!_.isEmpty(doctorArr)) {


            // update state
            setDoctorArr(doctorArr)

        }
    }, [doctorArr]);

    return (
        <div>
            <HomeHeader isShowBanner={true} />
            <Specialty setting={settings} />
            <MedicalFacility
                setting={settings}
            />
            <OutStandingDoctor
                doctors={doctorArr}
                setting={settings} />
            <HandBook setting={settings} />

            {/* <div style={{ height: '300px' }}></div> */}
            {/* 
              
                <VidInfo setting={settings} /> */}
            {/* <HomeFooter /> */}





        </div>
    )


}



export default User;
