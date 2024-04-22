import { Navbar, Nav, NavItem, NavLink, NavbarBrand } from 'reactstrap';
import { Link } from 'react-router-dom';
import '../../utils/style/navbarStyle.css'
function NavBar() {
    return (
        <div className='navbar-container'>
            <Navbar>
                <NavbarBrand>
                    <img className='navbar-logo' src="src\assets\logo.jpg" style={{ width: "100%" }} />
                </NavbarBrand>
                <Nav className="mr-auto" navbar>
                    <NavItem className='navbar-item'>
                        <Link to="dashboard"> <box-icon name='home' /></Link>
                        <NavLink tag={Link} to="dashboard" >Home</NavLink>
                    </NavItem>
                    <NavItem className='navbar-item'>
                        <Link to="submission"><box-icon name='dock-left' /> </Link>
                        <NavLink tag={Link} to="submissions" >Reports</NavLink>
                    </NavItem>
                    <NavItem className='navbar-item'>
                        <Link to="create"><box-icon name='plus-circle' /></Link>
                        <NavLink tag={Link} to="create" >Create</NavLink>
                    </NavItem>
                    <NavItem className='navbar-item'>
                        <Link to="messages"><box-icon name='message-rounded-dots' /></Link>
                        <NavLink tag={Link} to="profile" >Profile</NavLink>
                    </NavItem>
                </Nav>
            </Navbar>
        </div>
    )
}

export default NavBar