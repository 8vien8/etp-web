import { Navbar, Nav, NavItem, NavLink, NavbarBrand } from 'reactstrap';
import { Link } from 'react-router-dom';
import './navbarStyle.css'
function NavBar() {
  return (
    <div className='navbar-container'>
        <Navbar color="dark" dark expand="md">
            <NavbarBrand>
                <img className='navbar-logo' src ="src\assets\logo.jpg" />         
            </NavbarBrand>
            <Nav className="mr-auto" navbar>
                <NavItem className='navbar-item'>
                    <box-icon name='home'/>
                    <NavLink tag={Link} to="/user-landing-page" >Home</NavLink>
                </NavItem>
                <NavItem className='navbar-item'>
                    <box-icon name='dock-left'/>
                    <NavLink tag={Link} to="/submissions" >Submission</NavLink>
                </NavItem>
                {/* <NavItem className='navbar-item'>
                    <box-icon type='solid' name='report'/>
                    <NavLink tag={Link} to="/reports" >Reports</NavLink>
                </NavItem> */}
                <NavItem className='navbar-item'>
                    <box-icon name='message-rounded-dots'/>
                    <NavLink tag={Link} to="/messages" >Messages</NavLink>
                </NavItem>
                <NavItem className='navbar-item'>
                    <box-icon name='user-circle'/>
                    <NavLink tag={Link} to="/profile" >Profile</NavLink>
                </NavItem>
                <NavItem className='navbar-item'>
                    <box-icon name='cog' />
                    <NavLink tag={Link} to="/settings" >Settings</NavLink>
                </NavItem>
            </Nav>
        </Navbar>
    </div>
  )
}

export default NavBar