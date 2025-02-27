import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import './Register.scss';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { registerService } from '../../service/apiService';

const Register = () => {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const defaultValidInput = {
        isValidPhone: true,
        isValidUsername: true,
        isValidPassword: true,
        isValidEmail: true,
        isValidConfirmPassword: true,
    }
    const setDefaultState = () => {
        setEmail('');
        setPhone('');
        setUsername('');
        setPassword('');
        setConfirmPassword('');
    }
    const [objectCheckInput, setObjCheckInput] = useState(defaultValidInput);

    const history = useHistory();
    const handleMoveToLogin = () => {
        history.push("/login")
    }

    const checkEmail = (email) => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    }

    const isValidInputs = () => {
        setObjCheckInput(defaultValidInput);

        if (!username) {
            toast.error("Vui lòng nhập tên của bạn");
            setObjCheckInput({ ...defaultValidInput, isValidUsername: false })
            return false
        }

        if (!phone) {
            toast.error("Vui lòng nhập SĐT");
            setObjCheckInput({ ...defaultValidInput, isValidPhone: false })
            return false
        }

        if (!email) {
            toast.error("Vui lòng nhập Email")
            setObjCheckInput({ ...defaultValidInput, isValidEmail: false })
            return false
        }

        if (!checkEmail(email)) {
            toast.error("Email không hợp lệ")
            setObjCheckInput({ ...defaultValidInput, isValidEmail: false })
            return false
        }

        if (!password) {
            toast.error("Vui lòng nhập mật khẩu")
            setObjCheckInput({ ...defaultValidInput, isValidPassword: false })
            return false
        }

        if (password.length < 3) {
            toast.error("Mật khẩu phải dài hơn 3 ký tự")
            setObjCheckInput({ ...defaultValidInput, isValidPassword: false })
            return false
        }

        if (!confirmPassword) {
            toast.error("Vui lòng nhập mật khẩu xác nhận")
            setObjCheckInput({ ...defaultValidInput, isValidConfirmPassword: false })
            return false
        }

        if (password !== confirmPassword) {
            toast.error("Mật khẩu không trùng khớp")
            setObjCheckInput({ ...defaultValidInput, isValidConfirmPassword: false })
            return false
        }

        return true;
    }

    const handleCreateAccount = async () => {
        let check = isValidInputs();
        if (check) {
            let res = await registerService(email, phone, username, password);

            if (res && res.EC === 0) {
                toast.success("Đăng ký thành công");
                setDefaultState();

            } else {
                toast.error(res.EM)
            }

        }
    }

    return (
        <div className="register-container">
            <div className="container">
                <div className="row">
                    <div className="content-left col-5 d-none d-md-flex col-lg-6 col-xl-7">
                        <div className='brand'>
                            DATEkko
                        </div>
                        <div className='description'>
                            Hệ thống quản lý đỉnh chóp số 1 VN
                        </div>
                    </div>

                    <div className="content-right col-12 col-md-7 col-lg-6 col-xl-5">
                        <div className='login-form d-flex flex-column gap-3'>
                            <div className='title'>
                                Trang Đăng Ký
                            </div>


                            <div className='input-control'>
                                <input
                                    onChange={(event) => setUsername(event.target.value)}
                                    value={username}
                                    type='text'
                                    className={objectCheckInput.isValidUsername ? "form-control" : "form-control is-invalid"}
                                    placeholder='Username'
                                />
                            </div>



                            <input
                                onChange={(event) => setPhone(event.target.value)}
                                value={phone}
                                type='text'
                                placeholder='Phone number'
                                className={objectCheckInput.isValidPhone ? "form-control" : "form-control is-invalid"}
                            />

                            <input
                                onChange={(event) => setEmail(event.target.value)}
                                value={email}
                                type='text'
                                className={objectCheckInput.isValidEmail ? "form-control" : "form-control is-invalid"}
                                placeholder='Email'
                            />

                            <input
                                onChange={(event) => setPassword(event.target.value)}
                                value={password}
                                type='password'
                                className={objectCheckInput.isValidPassword ? "form-control" : "form-control is-invalid"}
                                placeholder='Password'
                            />

                            <input
                                onChange={(event) => setConfirmPassword(event.target.value)}
                                value={confirmPassword}
                                type='password'
                                className={objectCheckInput.isValidConfirmPassword ? "form-control" : "form-control is-invalid"}
                                placeholder='Re-enter password' />

                            <button
                                onClick={() => handleCreateAccount()}
                                className='btn btn-danger mt-3'>Đăng Ký</button>

                            <hr />
                            <span className='text-center'>Bạn đã có tài khoản ư?</span>

                            <div className='text-center'>
                                <button
                                    onClick={() => handleMoveToLogin()}
                                    className='btn btn-success col-6'>Đăng nhập</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;