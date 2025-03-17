import React, { useEffect, useState } from 'react';

import Slider from "react-slick";

const OutStandingDoctor = (props) => {
    const { doctors, setting } = props
    const [arrDoctor, setArrDoctor] = useState([])


    useEffect(() => {
        if (doctors) {
            setArrDoctor(doctors)
        }

    })
    console.log('check user', arrDoctor)
    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     if (prevProps.topDoctorRedux !== this.props.topDoctorRedux) {
    //         this.setState({
    //             arrDoctor: this.props.topDoctorRedux
    //         })
    //     }
    // }
    // componentDidMount() {
    //     this.props.loadTopDoctors();
    // }
    // handleViewDetailDoctor = (doctor) => {
    //     if (this.props.history) {
    //         this.props.history.push(`/detail-doctor/${doctor.id}`);

    //     }
    // };

    return (
        <div className='section-share  section-outstanding-doctor' >
            <div className='section-container'>
                <div className='section-header'>
                    <span className='title-section'>
                        OutStandingDoctor
                    </span>
                    <button className='btn-section'>More Infor </button>

                </div>
                <div className='section-body'>
                    <Slider {...props.setting}>

                        {arrDoctor && arrDoctor.length > 0 &&
                            arrDoctor.map((item, index) => {
                                if (index === 0) {
                                    console.log(item)
                                }

                                const nameVi = ` ${item.lastName} ${item.firstName}`;
                                {/* let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`; */ }
                                return (
                                    <div key={index} className='section-customize'
                                        onClick={() => this.handleViewDetailDoctor(item)}>
                                        <div className='boder-customize'>
                                            <div className='outer-bg'>

                                                <div className='bg-imge  section-outstanding-doctor'
                                                    style={{ backgroundImage: `url(${item.image})` }}
                                                />




                                            </div>
                                            <div className=' position text-center' >

                                                <div>{nameVi}</div>
                                                <div> Nội khoa y học </div>
                                            </div>
                                        </div>

                                    </div>
                                )
                            })}
                    </Slider>
                </div>

            </div>
        </div>
    )


}

const mapStateToProps = state => {
    return {
        language: state.app.language,

        isLoggedIn: state.user.isLoggedIn,
        topDoctorRedux: state.admin.topDoctor
    };
};



export default OutStandingDoctor;
