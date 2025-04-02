import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import './LisClinic.scss'
import 'react-markdown-editor-lite/lib/index.css';

const TableManageUser = (props) => {

    const { listClinic, handleDeleteClinic, handleUpdateClinic } = props;

    // useEffect(() => {
    //     // getRequiredSpecialtyInfor();
    // }, [getRequiredSpecialtyInfor]);



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

    // const handleEditClinic = (data) => {
    //     console.log(data);
    //     handleEditUserFromProps(data);
    // };

    return (
        <div className="table-user-container">

            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">NO</th>
                        <th scope="col">Name Clinic</th>
                        <th scope="col">Adress</th>

                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listClinic && listClinic.length > 0 &&
                        listClinic.map((item, index) => {

                            return (
                                <tr key={index}>
                                    <td >{index + 1}</td>
                                    <td>{item.name}</td>

                                    <td>{item.address}</td>
                                    <td>
                                        <button
                                            onClick={() => { handleUpdateClinic(item) }}
                                            className="btn  btn-primary">
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => { handleDeleteClinic(item) }}
                                            className="btn btn-danger mx-3"> Delete</button>
                                        <button

                                            className="btn btn-info "> View</button>
                                    </td>
                                </tr>

                            )
                        })



                    }
                    {listClinic && listClinic.length === 0 &&
                        <tr >
                            <td colSpan={'5'}>Not Found User</td>
                        </tr>

                    }



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
