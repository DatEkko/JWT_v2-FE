import { useContext, useEffect, useState } from 'react';
import './Users.scss';
import { fetchAllUsers } from '../../service/apiService';
import ReactPaginate from 'react-paginate';
import ConfirmDeleteUserModal from '../modals/ConfirmDeleteUserModal';
import UserModal from '../modals/UserModal';
import { UserContext } from '../../context/UserContext';


const UsersPage = () => {
    const [listUser, setListUser] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimit, setCurrentLimit] = useState(5);
    const [totalPage, setTolalPages] = useState(0);
    const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
    const [dataDelete, setDataDelete] = useState({});
    const [dataEdit, setDataEdit] = useState({});
    const [titleModal, setTitleModal] = useState('');
    const [isOpenUserModal, setIsOpenUserModal] = useState(false);
    const [actionModalUser, setActionModalUser] = useState('CREATE');

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

    const handleDeleteUser = (user) => {
        setIsShowDeleteModal(true);
        setDataDelete(user);
    }

    const handleEditUser = (user) => {
        setTitleModal("Edit An User");
        setIsOpenUserModal(true);
        setDataEdit(user);
        setActionModalUser("EDIT");
    }

    const handleCreateUser = () => {
        setTitleModal("Create New User");
        setIsOpenUserModal(true);
        setActionModalUser("CREATE");
    }

    const handleRefresh = async () => {
        await fetchUsers();
        setCurrentPage(1);
    }

    return (
        <>
            <div className="manage-user-container container">
                <div className='user-header'>
                    <div
                        style={{
                            textAlign: "center",
                            fontSize: "2em",
                            fontWeight: 600,
                            fontFamily: "Lexend",
                            paddingTop: "15px"
                        }}
                        className='title'>Table Users</div>
                    <div className='actions'>
                        <button
                            onClick={() => handleRefresh()}
                            className='btn btn-success my-3'>Refresh<i className='fa fa-refresh mx-2'></i> </button>
                        <button
                            onClick={() => handleCreateUser()}
                            className='btn btn-primary mx-3 my-3'>Create New User<i className='fa fa-user-plus mx-2'></i></button>
                    </div>
                </div>

                <div className='user-body' style={{ height: "320px" }}>
                    <table className="table table-hover table-bordered">
                        <thead>
                            <tr style={{ textAlign: "center" }}>
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
                                        <tr key={item.id} style={{ textAlign: "center" }}>
                                            <th scope="row">{item.id}</th>
                                            <td>{item.email}</td>
                                            <td>{item.phone}</td>
                                            <td>{item.username}</td>
                                            <th>{item.Group?.name ?? <span style={{ color: "#878383", fontWeight: "400" }}>Not Authorized</span>}</th>
                                            <td>
                                                <button
                                                    onClick={() => handleEditUser(item)}
                                                    className='btn btn-warning '>Edit<i className="fa fa-pencil mx-2"></i></button>
                                                <button
                                                    onClick={() => handleDeleteUser(item)}
                                                    className='btn btn-danger mx-2'>Delete<i className="fa fa-trash mx-2"></i></button>
                                            </td>
                                        </tr>
                                    )
                                })
                                :
                                <tr>
                                    <td style={{ textAlign: "center", padding: "20px", fontFamily: "Lexend" }} colSpan={"6"}>No Data</td>
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

            <ConfirmDeleteUserModal
                show={isShowDeleteModal}
                setShow={setIsShowDeleteModal}
                dataDelete={dataDelete}
                fetchUsers={fetchUsers}
                setCurrentPage={setCurrentPage}
            />

            <UserModal
                titleModal={titleModal}
                show={isOpenUserModal}
                setShow={setIsOpenUserModal}
                fetchUsers={fetchUsers}
                action={actionModalUser}
                dataEdit={dataEdit}
            />

        </>

    )
}

export default UsersPage;