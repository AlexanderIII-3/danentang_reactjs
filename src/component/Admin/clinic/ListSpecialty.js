import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import './LisClinic.scss'
import 'react-markdown-editor-lite/lib/index.css';
import { handleFetchAllClinic } from '../../../services/userService'
const TableManageUser = ({ clinicArr }) => {
    const [listClinic, setListClinic] = useState([]);

    // useEffect(() => {
    //     // getRequiredSpecialtyInfor();
    // }, [getRequiredSpecialtyInfor]);

    useEffect(() => {
        handeFeacthAllClinic();
    }, [listClinic]);

    const handleDelete = async (item) => {
        console.log('check item', item);

        // let data = await handleDeleteSpecialy(item.id);
        let data = { errorCode: 0 }; // Dummy response, replace with actual API call

        if (data && data.errorCode === 0) {
            toast.success('Delete Specialty Successful!');
        } else {
            toast.error('Delete Specialty Failed!');
        }
    };
    const handeFeacthAllClinic = async () => {
        const res = await handleFetchAllClinic()
        if (res && res.EC === 0) {

            setListClinic(res.DT)
        }

    }
    // const handleEditClinic = (data) => {
    //     console.log(data);
    //     handleEditUserFromProps(data);
    // };

    return (
        <div className="users-table mt-3 mx-4 mb-5">
            <table id="TableManageUser">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Tên</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listClinic && listClinic.map((item, index) => (
                        <tr key={index}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>
                                {/* <button className='btn-edit' onClick={() => handleEditClinic(item)}>
                                    <i className='fas fa-pencil-alt'></i>
                                </button> */}
                                <button className='btn-delete' onClick={() => handleDelete(item)}>
                                    <i className='fas fa-trash-alt'></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const mapStateToProps = (state) => ({
    specialtyArr: state.admin.specialtyArr
});

const mapDispatchToProps = (dispatch) => ({
    // getRequiredSpecialtyInfor: () => dispatch(actions.getRequiredSpecialtyInfor())
});

export default TableManageUser;
