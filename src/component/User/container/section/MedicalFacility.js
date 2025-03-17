import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";


class MedicalFacility extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrClinic: []
        };
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.clinicArr !== this.props.clinicArr) {
            this.setState({
                arrClinic: this.props.clinicArr
            })
        }
    }
    // async componentDidMount() {
    //     let res = await this.props.getRequiredClinicInfor();
    //     if (res && res.errorCode === 0) {
    //         this.setState({
    //             arrClinic: res.data ? res.data : []
    //         })
    //     }
    // }
    handleViewDetailClinic = (item) => {
        if (this.props.history) {
            this.props.history.push(`/detail-clinic/${item.id}`);

        }
    };
    render() {

        let { arrClinic } = this.state;
        let language = this.props.language
        return (
            <div className='section-share  section-medical-facility'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>Medical Facility </span>
                        <button className='btn-section'> More Infor </button>

                    </div>
                    <div className='section-body'>
                        {/* <Slider {...this.props.setting}>
                            {arrClinic && arrClinic.length > 0 &&

                                arrClinic.map((item, index) => {

                                    if (index === 0) {
                                        console.log(item)
                                    }
                                    let image = item.image;
                                    return (
                                        <div key={index} className='section-customize clinic-child'
                                            onClick={() => this.handleViewDetailClinic(item)}
                                        >

                                            <div className='bg-imge section-medical-facility'
                                                style={{ backgroundImage: `url(${image})` }}
                                            />

                                            <div className='clinic-name'>  {item.name}</div>
                                        </div>
                                    )
                                })


                            }

                        </Slider> */}
                    </div>

                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        clinicArr: state.admin.clinicArr


    };
};


export default MedicalFacility;
