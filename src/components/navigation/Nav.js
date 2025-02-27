import React from 'react';
import './Nav.scss';
import { NavLink } from 'react-router-dom';

const Nav = (props) => {
    return (
        <div className='nav-container'>
            <div class="topnav">
                <NavLink to="/" exact>Home</NavLink>
                <NavLink to="/news">News</NavLink>
                <NavLink to="/contact">Contact</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/login">Login</NavLink>
            </div>

        </div>
    );
}

export default Nav;