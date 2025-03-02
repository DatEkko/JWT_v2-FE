import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { fetchGroup } from '../../service/apiService';
import { useEffect, useState } from 'react';
import _, { set } from "lodash";
import { createUserService, updateUserService } from '../../service/apiService';

const UserModal = (props) => {
    const { show, setShow, titleModal, fetchUsers, action, dataEdit } = props;
    const handleClose = () => {
        setShow(false);
    };

    const [userGroup, setUserGroup] = useState([]);

    const defaultUserData = {
        email: '',
        phone: '',
        username: '',
        password: '',
        address: '',
        sex: 'MALE',
        group: '',
    }

    const validInputDefault = {
        email: true,
        phone: true,
        username: true,
        password: true,
        address: true,
    }

    const [validInput, setValidInput] = useState(validInputDefault);

    const [userData, setUserData] = useState(defaultUserData);

    const handleOnchangeInput = (value, name) => {
        const _userData = _.cloneDeep(userData);
        _userData[name] = value;
        setUserData(_userData);
    }

    useEffect(() => {
        getGroups();
    }, [])

    useEffect(() => {
        if (action === 'EDIT') {
            setUserData({ ...dataEdit, group: dataEdit.Group?.id })
        }

        if (action === 'CREATE') {
            setUserData(defaultUserData)
        }
    }, [show])

    useEffect(() => {
        if (action === 'CREATE') {
            if (userGroup && userGroup.length > 0) {
                setUserData({ ...defaultUserData, group: userGroup[0].id })
            }
        }
    }, [action])

    const getGroups = async () => {
        let res = await fetchGroup();
        if (res && res.EC === 0) {
            setUserGroup(res.DT);
            if (res.DT && res.DT.length > 0) {
                let groups = res.DT;
                setUserData({ ...userData, group: groups[0].id })
            }
        }
    }

    const validateInput = () => {
        if (action === "EDIT") {
            return true
        }
        //create user
        setValidInput(validInputDefault)
        let arr = ['email', 'phone', 'password'];
        let check = true;
        for (let i = 0; i < arr.length; i++) {
            if (!userData[arr[i]]) {
                let _validInputs = _.cloneDeep(validInputDefault);
                _validInputs[arr[i]] = false;
                setValidInput(_validInputs);

                toast.error(`Empty input ${arr[i]}`);
                check = false;
                break;
            }
        }

        return check
    }

    const handleConfirmSubmit = async () => {
        //creatUser
        let check = validateInput();
        if (check === true) {
            let res = action === 'CREATE' ?
                await createUserService({ ...userData, groupId: +userData['group'] })
                :
                await updateUserService({ ...userData, groupId: +userData['group'] })

            if (res && res.EC === 0) {
                toast.success(res.EM);
                await fetchUsers();
                setUserData({ ...defaultUserData, group: userGroup[0].id });
                handleClose();
            }

            if (res && res.EC !== 0) {
                toast.error(res.EM);
                let _validInputs = _.cloneDeep(validInputDefault);
                _validInputs[res.DT] = false;
                setValidInput(_validInputs);
            }
        }
    }

    return (
        <>
            <Modal
                size='lg'
                show={show}
                onHide={handleClose}
                backdrop="static"
            >
                <Modal.Header closeButton>
                    <Modal.Title>{titleModal}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='content-body row'>
                        <div className='col-6 form-group'>
                            <label>Email address (<span style={{ color: "red" }}>*</span>) :</label>
                            <input
                                onChange={(event) => handleOnchangeInput(event.target.value, "email")}
                                value={userData.email}
                                disabled={action === 'CREATE' ? false : true}
                                className={validInput.email ? 'form-control' : 'form-control is-invalid'}
                                type='email' />
                        </div>

                        <div className='col-6 form-group'>
                            <label>Phone number (<span style={{ color: "red" }}>*</span>) :</label>
                            <input
                                onChange={(event) => handleOnchangeInput(event.target.value, "phone")}
                                value={userData.phone}
                                disabled={action === 'CREATE' ? false : true}
                                className={validInput.phone ? 'form-control' : 'form-control is-invalid'}
                                type='text' />
                        </div>

                        <div className='col-6 form-group my-2'>
                            <label>Password (<span style={{ color: "red" }}>*</span>) :</label>
                            <input
                                onChange={(event) => handleOnchangeInput(event.target.value, "password")}
                                value={userData.password}
                                disabled={action === 'CREATE' ? false : true}
                                className={validInput.password ? 'form-control' : 'form-control is-invalid'}
                                type='password' />
                        </div>

                        <div className='col-6 form-group my-2'>
                            <label>Group (<span style={{ color: "red" }}>*</span>) :</label>
                            <select
                                value={userData.group}
                                className='form-select'
                                onChange={(event) => handleOnchangeInput(event.target.value, "group")}>
                                {userGroup && userGroup.length > 0 &&
                                    userGroup.map((item, index) => {
                                        return (
                                            <option key={index} value={item.id}>
                                                {item.name}
                                            </option>
                                        )
                                    })
                                }
                            </select>
                        </div>

                        <div className='col-6 form-group'>
                            <label>Username :</label>
                            <input
                                onChange={(event) => handleOnchangeInput(event.target.value, "username")}
                                value={userData.username}
                                className={validInput.username ? 'form-control' : 'form-control is-invalid'}
                                type='text' />
                        </div>

                        <div className='col-6 form-group'>
                            <label>Gender :</label>
                            <select
                                value={userData.sex}
                                className='form-select'
                                onChange={(event) => handleOnchangeInput(event.target.value, "sex")}>
                                <option defaultValue={"MALE"}>Male</option>
                                <option value={"FEMALE"}>Female</option>
                                <option value={"OTHER"}>Other</option>
                            </select>
                        </div>

                        <div className='col-12 form-group my-2'>
                            <label>Address :</label>
                            <input
                                onChange={(event) => handleOnchangeInput(event.target.value, "address")}
                                value={userData.address}
                                className={validInput.address ? 'form-control' : 'form-control is-invalid'}
                                type='text' />
                        </div>

                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Nah
                    </Button>
                    <Button variant="warning" onClick={() => handleConfirmSubmit()}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    )
}

export default UserModal;