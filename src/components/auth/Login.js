import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import './Login.scss';

const Login = () => {
    const history = useHistory();
    const handleCreateNewAccount = () => {
        history.push("/register")
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
                            <input type='text' className='form-control' placeholder='Email or phone number' />
                            <input type='password' className='form-control' placeholder='Password' />
                            <button className='btn btn-danger my-3'>Đăng nhập</button>
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