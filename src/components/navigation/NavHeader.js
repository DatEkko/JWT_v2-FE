import React, { useContext } from 'react';
import './NavHeader.scss';
import { NavLink, useLocation, useHistory } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { logoutService } from '../../service/apiService';
import { toast } from 'react-toastify';

const NavHeader = (props) => {
    const { user, doLogoutContext } = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();

    const handleLogout = async () => {
        let res = await logoutService(); //clear cookie
        localStorage.removeItem("jwt"); //clear local storage
        doLogoutContext(); //clear contextApi

        if (res && res.EC === 0) {
            toast.success("Logout success!!!");
            history.push("/login")
        } else {
            toast.error("Oops, something wrong")
        }
    }

    if (user && user.isAuthenticated === true || location.pathname === "/") {
        return (
            <>
                <div className='nav-header-container'>
                    <Navbar bg='dark' expand="lg" className="bg-header">
                        <Container>
                            <NavLink to="/" className="navbar-brand">DATEkko</NavLink>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="me-auto">
                                    <NavLink to="/users" className="nav-link">Users</NavLink>
                                    <NavLink to="/projects" className="nav-link">Projects</NavLink>
                                    <NavLink to="/roles" className="nav-link">Roles</NavLink>
                                </Nav>

                                <Nav>
                                    {user && user.isAuthenticated === true ?
                                        <>
                                            <Nav.Item className='welcome'>Welcome {user.account.username}! </Nav.Item>

                                            <NavDropdown title="Setting" id="basic-nav-dropdown">
                                                <NavDropdown.Item href="#action/3.1">Change Password</NavDropdown.Item>
                                                <NavDropdown.Divider />
                                                <NavDropdown.Item>
                                                    <span onClick={() => handleLogout()}>Log Out</span>
                                                </NavDropdown.Item>
                                            </NavDropdown>
                                        </>
                                        :
                                        <>
                                            <NavLink
                                                to="/login"
                                                className='nav-link'
                                            >
                                                LOGIN
                                            </NavLink>
                                        </>
                                    }

                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </div>

            </>
        )
    } else {
        return <></>
    }


}

export default NavHeader;