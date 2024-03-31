import React from "react";
import NavBar from "../navbar/NavBar";
import { Container, Row, Col, Table } from "reactstrap";
import "./profileStyle.css";

function Profile() {
  return (
    <div>
      <NavBar />

      <div>
        <Container>
          <Row>
            <Col>
              <div className="profile-picture"></div>
            </Col>
          </Row>
          <Row>
            <Col>
              <Table>
                <tbody>
                  <tr>
                    <td>ID:</td>
                    <td>12345</td>
                    <td>Major:</td>
                    <td>Computer </td>
                  </tr>
                  <tr>
                    <td>Name:</td>
                    <td>ABC</td>
                    <td>Class:</td>
                    <td>2024</td>
                  </tr>
                  <tr>
                    <td>Email:</td>
                    <td>ABC@example.com</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
          <Row>
            <Col>
              <Table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Attendance</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>2024-03-04</td>
                    <td>Present</td>
                    <td>Notes...</td>
                  </tr>
                  <tr>
                    <td>2024-03-04</td>
                    <td>Absent</td>
                    <td>Notes...</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
          <Row>
            <Col>
              <Table>
                <thead>
                  <tr>
                    <th>Purpose</th>
                    <th>Data submission</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Purpose 1</td>
                    <td>2024-03-04</td>
                    <td>Approved</td>
                  </tr>
                  <tr>
                    <td>...</td>
                    <td>...</td>
                    <td>Rejected</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default Profile;
