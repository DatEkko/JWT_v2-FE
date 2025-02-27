import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import './Register.scss';

const Register = () => {
    const history = useHistory();
    const handleMoveToLogin = () => {
        history.push("/login")
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
                                Trang Đăng Ký
                            </div>
                            <input type='text' className='form-control' placeholder='Email' />
                            <input type='password' className='form-control' placeholder='Password' />
                            <input type='password' className='form-control' placeholder='Re-enter password' />
                            <input type='text' className='form-control' placeholder='Username' />
                            <input type='text' className='form-control' placeholder='Phone number' />
                            <button className='btn btn-danger mt-3'>Đăng Ký</button>

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