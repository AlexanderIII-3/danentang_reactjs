import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login');
    };

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <NavLink to='/' className='navbar-brand'>Alex Nguyễn</NavLink>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {/* This is route ro redirect another page */}
                        <NavLink to='/' className='nav-link'>Home</NavLink>
                        <NavLink to='/users' className='nav-link'>User</NavLink>
                        <NavLink to='/admins' className='nav-link'>Admin</NavLink>


                    </Nav>
                    <Nav>
                        <button
                            onClick={() => { handleLogin() }}
                            className='btn-login'>Login</button>
                        <button
                            onClick={() => { navigate('/register') }}
                            className='btn-signup'>Sign up </button>
                        {/* <NavDropdown title="Setting" id="basic-nav-dropdown">

                            <NavDropdown.Item >Log in</NavDropdown.Item>
                            <NavDropdown.Item>Log out</NavDropdown.Item>


                            <NavDropdown.Item >Profile </NavDropdown.Item>

                        </NavDropdown> */}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;