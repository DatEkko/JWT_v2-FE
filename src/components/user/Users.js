import { useEffect, useState } from 'react';
import './Users.scss';
import { fetchAllUsers } from '../../service/apiService';
import ReactPaginate from 'react-paginate';


const UsersPage = () => {
    const [listUser, setListUser] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimit, setCurrentLimit] = useState(5);
    const [totalPage, setTolalPages] = useState(0)

    useEffect(() => {
        fetchUsers();
    }, [currentPage]);

    const fetchUsers = async () => {
        let res = await fetchAllUsers(currentPage, currentLimit);
        if (res && res.EC === 0) {
            setTolalPages(res.DT.totalPages)
            setListUser(res.DT.users)
        }
    }

    const handlePageClick = async (event) => {
        setCurrentPage(+event.selected + 1);
    }

    const handleDeleteUser = async (id) => {
        console.log(id)
    }

    return (
        <div className="manage-user-container container">
            <div className='user-header'>
                <div className='title'>Table Users</div>
                <div className='actions'>
                    <button className='btn btn-success'>Refresh</button>
                    <button className='btn btn-primary'>Create New User</button>
                </div>
            </div>

            <div className='user-body' style={{ height: "320px" }}>
                <table className="table table-hover table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Username</th>
                            <th scope="col">Group</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listUser && listUser.length > 0 ?
                            listUser.map((item) => {
                                return (
                                    <tr key={item.id}>
                                        <th scope="row">{item.id}</th>
                                        <td>{item.email}</td>
                                        <td>{item.phone}</td>
                                        <td>{item.username}</td>
                                        <th>{item.Group?.name ?? <span style={{ color: "#878383", fontWeight: "400" }}>Not Authorized</span>}</th>
                                        <td>
                                            <button className='btn btn-warning '>Edit</button>
                                            <button
                                                onClick={() => handleDeleteUser(item.id)}
                                                className='btn btn-danger mx-2'>Delete</button>
                                        </td>
                                    </tr>
                                )
                            })
                            :
                            <tr>
                                <td style={{ textAlign: "center" }} colSpan={"4"}>No Data</td>
                            </tr>
                        }

                    </tbody>
                </table>
            </div>

            {totalPage > 0 &&
                <div className='user-footer' style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
                    <ReactPaginate
                        nextLabel=">>"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={3}
                        marginPagesDisplayed={2}
                        pageCount={totalPage}
                        previousLabel="<<"
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        breakLabel="..."
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        containerClassName="pagination"
                        activeClassName="active"
                        renderOnZeroPageCount={null}
                    />
                </div>
            }
        </div>
    )
}

export default UsersPage;