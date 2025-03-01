import React, { useEffect, useState } from 'react';
import './Nav.scss';
import { NavLink, useLocation } from 'react-router-dom';

const Nav = (props) => {
    const [isShowHeader, setIsShowHeader] = useState(true);
    let location = useLocation();

    useEffect(() => {
        let session = sessionStorage.getItem('account');
        if (location.pathname === "/login") {
            setIsShowHeader(false)
        }
    }, []);

    return (
        <>
            {isShowHeader === true &&
                <div className='nav-container'>
                    <div className="topnav">
                        <NavLink to="/" exact>Home</NavLink>
                        <NavLink to="/projects">Projects</NavLink>
                        <NavLink to="/users">Users</NavLink>
                        <NavLink to="/register">Register</NavLink>
                        <NavLink to="/login">Login</NavLink>
                    </div>
                </div>
            }
        </>

    );
}

export default Nav;