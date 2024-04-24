import { Navbar, Nav, NavItem, NavLink, NavbarBrand } from "reactstrap";
import { Link } from "react-router-dom";

function AdminNavbar() {
  return (
    <div className="navbar-container">
      <Navbar>
        <NavbarBrand>
          <img src="src\assets\logo.jpg" style={{ width: "100%" }} />
        </NavbarBrand>
        <Nav className="mr-auto">
          <NavItem className="navbar-item">
            <Link to="classes"></Link>
            <NavLink tag={Link} to="classes">
              Class
            </NavLink>
          </NavItem>
          <NavItem className="navbar-item">
            <Link to="user"></Link>
            <NavLink tag={Link} to="user">
              User
            </NavLink>
          </NavItem>
          <NavItem className="navbar-item">
            <Link to="crud"></Link>
            <NavLink tag={Link} to="crud">
              CRUD
            </NavLink>
          </NavItem>
          <NavItem></NavItem>
        </Nav>
      </Navbar>
    </div>
  );
}

export default AdminNavbar;
