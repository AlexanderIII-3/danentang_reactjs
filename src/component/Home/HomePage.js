import videoHomePage from '../../assets/video-homepage.mp4';
import './HomePage.scss';
const HomePage = () => {
    return (
        <div className="homepage-container">
            <video autoPlay muted loop  >
                <source src={videoHomePage} type="video/mp4" />
            </video>
            <div className='homepage-content'>
                <div className='homepage-title' >There's the best way to learn </div>
                <div className='homepage-description'>We are here to assistent you improving your self , do let it better yesterday! </div>
                <div className='btn-infor'>
                    <button>Click here if you are interested
                    </button>

                </div>
            </div>

        </div>
    )
}
export default HomePage;  