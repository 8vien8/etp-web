import { Navbar, Nav, NavItem, NavLink, NavbarBrand } from 'reactstrap';
import { Link } from 'react-router-dom';
import '../../utils/style/navbarStyle.css'
function NavBar() {
    return (
        <div className='navbar-container'>
            <Navbar>
                <NavbarBrand>
                    <img className='navbar-logo' src="https://telegraph-image-bak.pages.dev/file/4416b1da140c3ac1902ce.png" />
                </NavbarBrand>
                <Nav className="mr-auto" navbar>
                    <NavItem className='navbar-item'>
                        <Link to=''><box-icon type='solid' name='home' /></Link>
                        <NavLink tag={Link} to="" >Home</NavLink>
                    </NavItem>
                    {/* <NavItem className='navbar-item'>
                        <box-icon type='solid' name='dashboard' />
                        <NavLink tag={Link} to="dashboard" >Board</NavLink>
                    </NavItem> */}
                    <NavItem className='navbar-item'>
                        <Link to='director'><box-icon type='solid' name='user-rectangle' /></Link>
                        <NavLink tag={Link} to="director" >Directors</NavLink>
                    </NavItem>
                    <NavItem className='navbar-item'>
                        <Link to='courses'><box-icon type='solid' name='collection' /></Link>
                        <NavLink tag={Link} to="courses" >Articles</NavLink>
                    </NavItem>
                    <NavItem className='navbar-item'>
                        <Link to='classes'><box-icon type='solid' name='school' /></Link>
                        <NavLink tag={Link} to="classes" >Classes</NavLink>
                    </NavItem>
                    <NavItem className='navbar-item'>
                        <Link to="profile"><box-icon name='user-circle' /></Link>
                        <NavLink tag={Link} to="profile" >Profile</NavLink>
                    </NavItem>
                </Nav>
            </Navbar>
        </div>
    )
}

export default NavBar