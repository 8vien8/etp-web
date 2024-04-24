import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Input } from "reactstrap";

function AdminCrud() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [userData, setUserData] = useState({
    id: "",
    role: "",
    username: "",
    password: "",
    name: "",
    email: "",
  });

  useEffect(() => {
    const getMaxId = async () => {
      try {
        const response = await fetch("http://localhost:3001/users");
        const users = await response.json();
        if (users.length > 0) {
          const maxId = users.reduce((max, user) => Math.max(max, user.id), 0);
          // +1 id
          setUserData((prevUserData) => ({
            ...prevUserData,
            id: maxId + 1,
          }));
        } else {
          // without id, set id default is 1
          setUserData((prevUserData) => ({
            ...prevUserData,
            id: 1,
          }));
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    getMaxId();
  }, []);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {};

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleRoleChange = (event) => {
    setUserData({ ...userData, role: event.target.value });
  };

  const handleSubmit = () => {
    fetch("http://localhost:3001/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Profile saved successfully. ");
          setUserData({
            id: "",
            role: "",
            username: "",
            password: "",
            name: "",
            email: "",
          });
        } else {
          throw new Error("Failed to save user data");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <Container>
      <Row>
        <Col sm="3">
          <Input
            type="file"
            onChange={handleFileChange}
            placeholder="image file"
          />
          <Button color="primary" onClick={handleUpload}></Button>
          {selectedFile && (
            <img
              src={URL.createObjectURL(selectedFile)}
              alt="Avatar Preview"
              style={{ maxWidth: "100%", marginTop: "10px" }}
            />
          )}
        </Col>
        <Col sm="6">
          <h3>ID *</h3>
          <Input
            type="number"
            placeholder="ID..."
            name="id"
            value={userData.id}
            onChange={handleInputChange}
            disabled
          />
          <h3>Role *</h3>
          <Input
            type="select"
            placeholder="Coor,Stu,.."
            name="role"
            value={userData.role}
            onChange={handleRoleChange}
          >
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
            <option value="coordinator">Coordinator</option>
            <option value="student">Student</option>
            <option value="guest">Guest</option>
          </Input>
          <h3>User name *</h3>
          <Input
            type="text"
            placeholder="User name..."
            name="username"
            value={userData.username}
            onChange={handleInputChange}
          />
          <h3>Password *</h3>
          <Input
            type="text"
            placeholder="Pass word..."
            name="password"
            value={userData.password}
            onChange={handleInputChange}
          />
          <h3>Name *</h3>
          <Input
            type="text"
            placeholder="Full name..."
            name="name"
            value={userData.name}
            onChange={handleInputChange}
          />
          <h3>Email *</h3>
          <Input
            type="email"
            placeholder="Email..."
            name="email"
            value={userData.email}
            onChange={handleInputChange}
          />
        </Col>
        <Button onClick={handleSubmit}>Submit</Button>
      </Row>
    </Container>
  );
}
export default AdminCrud;
