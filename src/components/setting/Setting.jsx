import React from "react";
import { Container, Row, Col, Table, Button, Input } from "reactstrap";

function Setting() {
  return (
    <div>
      <Container>
        <Row>
          <div className="col-6">
            <h1>Personal Information</h1>
            <h3>Name</h3>
            <Input type="text" name="setting-name" />
            <h3>Phone number</h3>
            <Input type="number" name="setting-phone" />
            <h2>Profile Picture</h2>
            <Input
              type="file"
              name="setting-picture"
              placeholder="Choose file"
            />
            <Button>Upload</Button>
          </div>
          <div className="col-6">
            <h1>Password</h1>
            <h3>Current Password</h3>
            <Input type="text" name="setting-password" />
            <h3>New Password</h3>
            <Input type="text" name="setting-new-password" />
            <h3>Confirm New Password</h3>
            <Input type="text" name="setting-confirm-password" />
          </div>
        </Row>
        <div>
          <Button>Submit</Button>
        </div>
      </Container>
    </div>
  );
}

export default Setting;
