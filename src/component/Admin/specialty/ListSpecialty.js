import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import './ListSpecialty.scss'
import 'react-markdown-editor-lite/lib/index.css';

const ListSpecialty = (props) => {

    const { listSpecialty, handleDelete, handleUpdateSpecialty } = props;






    return (
        <div className="table-user-container">

            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">NO</th>
                        <th scope="col">Name Specialty</th>


                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listSpecialty && listSpecialty.length > 0 &&
                        listSpecialty.map((item, index) => {

                            return (
                                <tr key={index}>
                                    <td >{index + 1}</td>
                                    <td>{item.name}</td>


                                    <td>
                                        <button
                                            onClick={() => { handleUpdateSpecialty(item) }}
                                            className="btn  btn-primary">
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => { handleDelete(item) }}
                                            className="btn btn-danger mx-3"> Delete</button>
                                        <button

                                            className="btn btn-info "> View</button>
                                    </td>
                                </tr>

                            )
                        })



                    }
                    {listSpecialty && listSpecialty.length === 0 &&
                        <tr >
                            <td colSpan={'5'}>Not Found User</td>
                        </tr>

                    }



                </tbody>
            </table>
        </div>
    );
};


export default ListSpecialty;
