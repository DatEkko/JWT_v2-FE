import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { deleteUser } from '../../service/apiService';
import { toast } from 'react-toastify';

const ConfirmDeleteUserModal = (props) => {
    const { show, setShow, dataDelete, fetchUsers, setCurrentPage } = props;

    const handleClose = () => setShow(false);

    const handleDeleteUser = async () => {
        let res = await deleteUser(dataDelete);
        if (res && res.EC === 0) {
            toast.success("Delete User Success");
            await fetchUsers();
            setCurrentPage(1);
            setShow(false);
        } else {
            toast.error(res.EM)
        }
    }

    return (
        <>
            <Modal
                centered
                show={show}
                onHide={handleClose}>

                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete User</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete <b>{dataDelete.email} </b>account?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Nah
                    </Button>
                    <Button variant="danger" onClick={handleDeleteUser}>
                        Sure
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    )
}

export default ConfirmDeleteUserModal;