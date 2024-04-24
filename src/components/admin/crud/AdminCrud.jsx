import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Input } from "reactstrap";

function AdminCrud() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {};

  const handleSubmit = () => {
    fetch("API_EndPoint", {});
  };

  return (
    <Container>
      <Row>
        <Col sm="3">
          <Input type="file" onChange={handleFileChange} />
          <Button color="primary" onClick={handleUpload}>
            Upload
          </Button>
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
          <Input type="number" placeholder="ID..." />
          <h3>User name *</h3>
          <Input type="text" placeholder="User name..." />
          <h3>Name *</h3>
          <Input type="text" placeholder="Full name..." />
          <h3>Email *</h3>
          <Input type="email" placeholder="Email..." />
          <h3>Class *</h3>
          <Input type="text" placeholder="Class..." />
        </Col>
        <Button onClick={handleSubmit}>Submit</Button>
      </Row>
    </Container>
  );
}
export default AdminCrud;
