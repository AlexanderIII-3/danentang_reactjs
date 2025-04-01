
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import User from './component/User/User';
import Admin from './component/Admin/Admin';
import HomePage from './component/Home/HomePage';
import ManageUser from './component/Admin/Content/ManageUser';
import DashBoard from './component/Admin/Content/DashBoard';
import Login from './component/Sign/Login';
import Register from './component/Sign/Register';
import CustomScrollbars from './component/CustomScrollbars';
import ManageDoctor from './component/Admin/Content/ManageDoctor';
import ManageClinic from './component/Admin/clinic/ManageClinic';
const Layout = () => {

    return (
        <>
            <CustomScrollbars style={{ height: '100vh', width: '100%' }}>
                <Routes>
                    <Route path='/' element={<App />} >
                        <Route index element={<HomePage />} />



                    </Route>
                    <Route path="/users" element={<User />} />

                    <Route path="/admins" element={<Admin />} >
                        <Route index element={<DashBoard />} />

                        <Route path="manage-user" element={<ManageUser />} />
                        <Route path='manage-doctor' element={<ManageDoctor />}></Route>
                        <Route path='manage-clinic' element={<ManageClinic />}> </Route>
                    </Route>
                    <Route path="/login" element={<Login />} >

                    </Route>
                    <Route path="/register" element={<Register />} >

                    </Route>

                </Routes>
            </CustomScrollbars>


            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            // transition={Bounce}
            />

        </>
    )
};
export default Layout; 