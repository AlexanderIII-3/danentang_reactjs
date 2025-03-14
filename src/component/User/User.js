import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import HomeHeader from '../User/container/HomeHeader';
import HomeFooter from '../User/container/HomeFooter';

// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

class User extends Component {

    render() {
        let settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,

        };
        return (
            <div>
                <HomeHeader isShowBanner={true} />
                {/* <Specialty setting={settings} />
                <MedicalFacility
                    setting={settings} */}

                {/* <div style={{ height: '300px' }}></div> */}
                {/* <OutStandingDoctor setting={settings} />
                <HandBook setting={settings} />
                <VidInfo setting={settings} /> */}
                {/* <HomeFooter /> */}





            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default User;
