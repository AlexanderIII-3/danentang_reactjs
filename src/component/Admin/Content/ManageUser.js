
import ModalCreateUser from './ModalCreateUser'
import './ManageUser.scss';
import { AiTwotonePlusCircle } from "react-icons/ai";
import TableUser from './TableUser';
import { useState, useEffect } from "react";
import { getAllUsers, getUserPaginates } from "../../../services/userService";
import ModalUpdateUser from './ModalUpdateUser';
import ModalDeleteUser from './ModalDeleteUser';
import ModalViewUser from './ModalViewUser';
import TableUserPaginate from './TableUserPaginate';
const ManageUser = (props) => {

    const [showModalCreateUser, setShowModalCreateUser] = useState(false);
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
    const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
    const [showModalViewUser, setShowModalViewUser] = useState(false)

    const [dataDelete, setDataDelete] = useState({});
    const [dataUpdateUser, setDataUpdateUser] = useState({})
    const [dataViewUser, setDataViewUser] = useState({});
    const [listUser, setListUser] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const LIMIT_USER = 1;
    useEffect(() => {
        getAllUser()
        // getUserPaginate(1)


    }, [])
    const getAllUser = async () => {
        let res = await getAllUsers()
        if (res.EC === 0) {
            setListUser(res.DT)

        } else {
            return
        }
    }
    // const getUserPaginate = async (page) => {
    //     let res = await getUserPaginates(page, LIMIT_USER);
    //     if (res.EC === 0) {
    //         setListUser(res.DT.users)
    //         setPageCount(res.DT.totalPages)

    //     } else {
    //         return
    //     }
    // }
    const refeshDetailUser = () => {
        setDataViewUser({})
    };
    //CRUD USER
    const handleClickBtnUpdateUser = (user) => {
        setDataUpdateUser(user)
        setShowModalUpdateUser(true);
    };
    const handleClickBtnDeleteUser = async (data) => {

        setShowModalDeleteUser(true);
        setDataDelete(data);


    };
    const handleClickBtnViewUser = (user) => {
        console.log('check detail user', user);
        setDataViewUser(user);
        setShowModalViewUser(true);

    };

    return (
        <div className="manage-user-container">

            <div className="title">
                Manage User
            </div>
            <div className="user-content">
                <div className='btn-add-new'>
                    <button
                        onClick={() => { setShowModalCreateUser(true) }}

                        className='btn btn-primary' >
                        <AiTwotonePlusCircle size={'1em'} />  Add New User</button>
                </div>
                <div className="table-user-container">
                    <TableUser
                        handleClickBtnDeleteUser={handleClickBtnDeleteUser}
                        handleClickBtnUpdateUser={handleClickBtnUpdateUser}
                        handleClickBtnViewUser={handleClickBtnViewUser}
                        getAllUser={getAllUser}
                        listUser={listUser} />

                    {/* <TableUserPaginate
                        getUserPaginate={getUserPaginate}
                        handleClickBtnDeleteUser={handleClickBtnDeleteUser}
                        handleClickBtnUpdateUser={handleClickBtnUpdateUser}
                        handleClickBtnViewUser={handleClickBtnViewUser}
                        listUser={listUser}

                        pageCount={pageCount}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}

                    /> */}

                </div>
                <ModalCreateUser
                    showModalCreateUser={showModalCreateUser}
                    setShowModalCreateUser={setShowModalCreateUser}
                    getAllUser={getAllUser}

                    // getUserPaginate={getUserPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
                <ModalUpdateUser
                    setShowModalUpdateUser={setShowModalUpdateUser}
                    getAllUser={getAllUser}

                    showModalUpdateUser={showModalUpdateUser}
                    dataUpdateUser={dataUpdateUser}

                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                // getUserPaginate={getUserPaginate}

                />
                <ModalDeleteUser
                    show={showModalDeleteUser}
                    setShow={setShowModalDeleteUser}
                    dataDelete={dataDelete}
                    getAllUser={getAllUser}


                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                // getUserPaginate={getUserPaginate}
                />
                <ModalViewUser
                    dataViewUser={dataViewUser}
                    show={showModalViewUser}
                    setShow={setShowModalViewUser}
                    refeshDetailUser={refeshDetailUser}

                />

            </div>
        </div>
    )
};
export default ManageUser;