import React, { Component } from 'react';
import Slider from "react-slick";
import './Specialty.scss';
import '../../User.scss'
// import { handleGetDetailSpecialtyById } from '../../../services/userService';



const Specialty = (props) => {


    // const handleViewDetailSpecialty = async (data) => {
    //     console.log('check eami specialty', data)


    //     if (this.props.history) {
    //         this.props.history.push(`/detail-specialty/${data.id}`);

    //     }
    // };

    return (
        <div className='section-share section-specialty'>
            <div className='section-container'>
                <div className='section-header'>
                    <span className='title-section'>
                        Specialty
                    </span>
                    <button className='btn-section'> More Info
                    </button>

                </div>
                <div className='section-body'>
                    <Slider {...props.setting}>
                        <div>
                            <h3>1</h3>
                        </div>
                        <div>
                            <h3>2</h3>
                        </div>
                        <div>
                            <h3>3</h3>
                        </div>
                        <div>
                            <h3>4</h3>
                        </div>
                        <div>
                            <h3>5</h3>
                        </div>
                        <div>
                            <h3>6</h3>
                        </div>
                        {/* {allSpecialty && allSpecialty.length > 0 &&
                            allSpecialty.map((item, index) => {
                                if (index === 0) {
                                    console.log(item)
                                }

                                let name = item.name;
                                let image = item.image;
                                return (
                                    <div className='section-customize specialty-child'
                                        key={index}
                                        onClick={() => this.handleViewDetailSpecialty(item)}
                                    >
                                        <div

                                            className='bg-imge section-specialty'

                                            style={{ backgroundImage: `url(${image})` }}
                                        />
                                        <div className='content-specialty'> {name}</div>
                                    </div>
                                )
                            })
                        } */}


                    </Slider>
                </div>

            </div>
        </div>
    );


}





export default Specialty;
