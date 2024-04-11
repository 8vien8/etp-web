import { Navbar, Nav, NavItem, NavLink, NavbarBrand } from 'reactstrap';
import { Link } from 'react-router-dom';
import '../../utils/style/navbarStyle.css'
function NavBar() {
    return (
        <div className='navbar-container'>
            <Navbar>
                <NavbarBrand>
                    <img className='navbar-logo' src="src\assets\logo.jpg" />
                </NavbarBrand>
                <Nav className="mr-auto" navbar>
                    <NavItem className='navbar-item'>
                        <box-icon name='home' />
                        <NavLink tag={Link} to="dashboard" >Home</NavLink>
                    </NavItem>
                    <NavItem className='navbar-item'>
                        <box-icon name='user-plus' />
                        <NavLink tag={Link} to="create-user" >User</NavLink>
                    </NavItem>
                    <NavItem className='navbar-item'>
                        <box-icon name='user-circle' />
                        <NavLink tag={Link} to="profile" >Profile</NavLink>
                    </NavItem>
                </Nav>
            </Navbar>
        </div>
    )
}

export default NavBar