

const TableUser = (props) => {

    const { listUser, handleClickBtnUpdateUser, handleClickBtnDeleteUser, handleClickBtnViewUser } = props
    return (
        <div className="table-user-container">

            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">NO</th>
                        <th scope="col">Email</th>
                        <th scope="col">User Name</th>
                        <th scope="col">Role</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listUser && listUser.length > 0 &&
                        listUser.map((item, index) => {

                            return (
                                <tr key={index}>
                                    <td >{index + 1}</td>
                                    <td>{item.email}</td>
                                    <td>{item.username}</td>
                                    <td>{item.role}</td>
                                    <td>
                                        <button
                                            onClick={() => { handleClickBtnUpdateUser(item) }}
                                            className="btn  btn-primary">
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => { handleClickBtnDeleteUser(item) }}
                                            className="btn btn-danger mx-3"> Delete</button>
                                        <button
                                            onClick={() => { handleClickBtnViewUser(item) }}
                                            className="btn btn-info "> View</button>
                                    </td>
                                </tr>

                            )
                        })



                    }
                    {listUser && listUser.length === 0 &&
                        <tr >
                            <td colSpan={'5'}>Not Found User</td>
                        </tr>

                    }



                </tbody>
            </table>
        </div>
    )
};
export default TableUser;