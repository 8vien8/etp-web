import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Input,
  Table,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import db1 from "../../../../db1.json";

function AdminManageUser() {
  const [numUsers, setNumUsers] = useState(10); //default number user show
  const [users, setUsers] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => setDropdownOpen((prevState) => !prevState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/users");
        const data = await response.json();
        setUsers(db1.users);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    setNumUsers(parseInt(e.target.value));
  };

  return (
    <div>
      <div>
        <Row>
          <Col sm="6">
            <h3>Show Users</h3>
            <Input
              type="number"
              value={numUsers}
              onChange={handleInputChange}
            />
            <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
              <DropdownToggle>Show</DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={() => setNumUsers(5)}>5</DropdownItem>
                <DropdownItem onClick={() => setNumUsers(10)}>10</DropdownItem>
                <DropdownItem onClick={() => setNumUsers(20)}>20</DropdownItem>
                <DropdownItem onClick={() => setNumUsers(50)}>50</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </Col>
        </Row>
      </div>
      <div>
        <Table bordered>
          <thead>
            <tr>
              <th>ID</th>
              <th>Role</th>
              <th>User name</th>
              <th>Password</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.length > 0 &&
              users.slice(0, numUsers).map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.role}</td>
                  <td>{user.username}</td>
                  <td>{user.password}</td>
                  <td>{user.email}</td>
                  <td>
                    <Button>Edit</Button>
                    <Button>Delete</Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default AdminManageUser;
