import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import './Login.scss';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { loginService } from '../../service/apiService';

const Login = () => {
    const [valueLogin, setValueLogin] = useState('');
    const [password, setPassword] = useState('');
    const defaultValid = {
        isValueLoginValid: true,
        isPasswordValid: true
    }

    const [objValidInput, setObjValidInput] = useState(defaultValid)

    const history = useHistory();
    const handleCreateNewAccount = () => {
        history.push("/register")
    }

    const handleSubmit = async () => {
        setObjValidInput(defaultValid);

        if (!valueLogin) {
            toast.error("Vui lòng nhập tên tài khoản");
            setObjValidInput({ ...defaultValid, isValueLoginValid: false })
            return
        }

        if (!password) {
            toast.error("Vui lòng nhập mật khẩu");
            setObjValidInput({ ...defaultValid, isPasswordValid: false })
            return
        }

        let res = await loginService(valueLogin, password);
        if (res && res.EC === 0) {
            toast.success(res.EM);

            let data = {
                isAuthenticated: true,
                token: "Fake toke"
            }

            sessionStorage.setItem("account", JSON.stringify(data));

            history.push("/users");
            window.location.reload();

        } else {
            toast.error(res.EM);
        }
    }

    const handleEnter = (event) => {
        if (event.code === "Enter") {
            handleSubmit();
        }

        return
    }

    return (
        <div className="login-container">
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
                                Trang Đăng Nhập
                            </div>
                            <input
                                onChange={(event) => setValueLogin(event.target.value)}
                                value={valueLogin}
                                type='text'
                                className={objValidInput.isValueLoginValid ? "form-control" : "form-control is-invalid"}
                                placeholder='Email or phone number' />

                            <input
                                onChange={(event) => setPassword(event.target.value)}
                                value={password}
                                type='password'
                                onKeyDown={(event) => handleEnter(event)}
                                className={objValidInput.isPasswordValid ? "form-control" : "form-control is-invalid"}
                                placeholder='Password' />

                            <button
                                onClick={() => handleSubmit()}
                                className='btn btn-danger my-3'>Đăng nhập</button>

                            <span className='text-center'>Quên mật khẩu ư?</span>
                            <hr />
                            <div className='text-center'>
                                <button
                                    onClick={() => handleCreateNewAccount()}
                                    className='btn btn-success col-6'>Đăng ký</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;