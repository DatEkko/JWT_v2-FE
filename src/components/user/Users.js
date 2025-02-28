import { useEffect } from 'react';
import './Users.scss';
import { useHistory } from 'react-router-dom';

const UsersPage = () => {
    const history = useHistory();
    useEffect(() => {
        let session = sessionStorage.getItem('account');
        if (!session) {
            history.push("/login")
        }
    })
    return (
        <div className="user-container">
            User Page
        </div>
    )
}

export default UsersPage;