import React from 'react';
import './HomeHeader.scss';

import { FaQuestionCircle } from "react-icons/fa";
import { FaBuilding } from "react-icons/fa";
import { FiSmartphone } from "react-icons/fi";
import { IoMdBed } from "react-icons/io";
import { FaBriefcaseMedical } from "react-icons/fa";
import { FaBrain } from "react-icons/fa";
import { TbDental } from "react-icons/tb";
import { Navigate, useNavigate } from 'react-router-dom';
const HomeHeader = (props) => {

    const navigate = useNavigate()




    return (
        <React.Fragment >
            <div className='home-header-container'>
                <div className='home-header-content'>
                    <div className='left-content'>
                        <i className='fas fa-align-justify'></i>
                        {/* <img src={logo} /> */}
                        <div className='header-logo' onClick={() => { navigate('/') }}  >


                        </div>
                    </div>
                    <div className='center-content'>
                        <div className='child-content'>
                            <div><b> Specialty    </b> </div>
                            <div className='sub-title'>Find doctor by specialty </div>
                        </div>
                        <div className='child-content'>
                            <div><b>Medical Facility </b> </div>
                            <div className='sub-title'>Choose a hospital or clinic</div>

                        </div>
                        <div className='child-content'>
                            <div><b>Doctor </b> </div>
                            <div className='sub-title'>Find a good Doctor</div>
                        </div>



                        <div className='child-content'>
                            <div><b> Reexamination</b> </div>
                            <div className='sub-title'>General Health </div>
                        </div>
                    </div>
                    <div className='right-content'>
                        <div className='support'><FaQuestionCircle />
                            <div>Support</div>



                        </div>
                        <div className='language-vi active '   ><span  >VN</span> </div>
                        <div className='language-en active '  ><span > EN</span></div>
                    </div>

                </div>
            </div>

            <div className='home-banner-container'>
                <div className='content-up'>
                    <div className='title1'>
                        MEDICAL FOUNDATION


                    </div>
                    <div className='title2'>

                        COMPREHENSIVE HEALTH CARE


                    </div>
                    <div className='search'>

                        <i className='fas fa-search'></i>
                        <input type='text' placeholder='Tìm chuyên khoa khám bệnh ' />

                    </div>
                </div>
                <div className='content-down'>
                    <div className='option'>
                        <div className='option-child'>
                            <div className='icon-child'>
                                <FaBuilding />


                            </div>
                            <div className='text-child'>
                                Specialized examination


                            </div>

                        </div>
                        <div className='option-child'>
                            <div className='icon-child'>
                                <FiSmartphone />


                            </div>
                            <div className='text-child'>
                                Remote examination


                            </div>

                        </div>
                        <div className='option-child'>
                            <div className='icon-child'>
                                <IoMdBed size={'medium'} />

                            </div>
                            <div className='text-child'>
                                General examination

                            </div>

                        </div>
                        <div className='option-child'>
                            <div className='icon-child'>
                                <FaBriefcaseMedical />
                            </div>
                            <div className='text-child'>
                                Medical tests
                            </div>

                        </div>
                        <div className='option-child'>
                            <div className='icon-child'>
                                <FaBrain />


                            </div>
                            <div className='text-child'>

                                Mental health


                            </div>

                        </div>
                        <div className='option-child'>
                            <div className='icon-child'>
                                <TbDental />


                            </div>
                            <div className='text-child'>
                                Dental examination


                            </div>

                        </div>
                    </div>
                </div>

            </div>

        </React.Fragment>
    );
}







export default HomeHeader;
