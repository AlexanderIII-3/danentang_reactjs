import React, { Component } from 'react';
import HomeHeader from '../User/container/HomeHeader';
import HomeFooter from '../User/container/HomeFooter';
import Specialty from '../User/container/section/Specialty';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const User = () => {

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,

    };

    return (
        <div>
            <HomeHeader isShowBanner={true} />
            <Specialty setting={settings} />
            {/* <MedicalFacility
                    setting={settings}
                /> */}

            {/* <div style={{ height: '300px' }}></div> */}
            {/* <OutStandingDoctor setting={settings} />
                <HandBook setting={settings} />
                <VidInfo setting={settings} /> */}
            {/* <HomeFooter /> */}





        </div>
    )


}



export default User;
