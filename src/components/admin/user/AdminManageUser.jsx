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

function AdminManageUser() {
  const [numUsers, setNumUsers] = useState(10); //default number user show
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => setDropdownOpen((prevState) => !prevState);

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
          <Col sm="6">
            <Button>Register Student</Button>
          </Col>
        </Row>
      </div>
      <div>
        <Table bordered>
          <thead>
            <tr>
              <th>ID</th>
              <th>User Name</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: numUsers }).map((_, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>Otto</td>
                <td>Student@example.com</td>
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
