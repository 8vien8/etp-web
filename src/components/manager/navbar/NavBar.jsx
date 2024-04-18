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
                        <box-icon type='solid' name='home' />
                        <NavLink tag={Link} to="" >Home</NavLink>
                    </NavItem>
                    <NavItem className='navbar-item'>
                        <box-icon type='solid' name='dashboard' />
                        <NavLink tag={Link} to="dashboard" >Board</NavLink>
                    </NavItem>
                    <NavItem className='navbar-item'>
                        <box-icon type='solid' name='user-rectangle' />
                        <NavLink tag={Link} to="coordinators" >Director</NavLink>
                    </NavItem>
                    <NavItem className='navbar-item'>
                        <box-icon type='solid' name='collection' />
                        <NavLink tag={Link} to="courses" >Courses</NavLink>
                    </NavItem>
                    <NavItem className='navbar-item'>
                        <box-icon type='solid' name='school' />
                        <NavLink tag={Link} to="classes" >Classes</NavLink>
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