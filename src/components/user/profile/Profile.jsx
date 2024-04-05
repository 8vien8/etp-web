import { Container, Row, Col, Table } from "reactstrap";
import "./profileStyle.css";
import Logout from '../../button/logOut.jsx'
function Profile() {
  return (
    <div>
      <div>
        <Container>
          <Row>
            <Col>
              <div className="profile-Header">
                <div className="profile-picture"></div>
              </div>
              <div className="logout-btn">
                <Logout />
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <Table>
                <tbody>
                  <tr>
                    <th>ID:</th>
                    <td>12345</td>
                    <th>Major:</th>
                    <td>Computer </td>
                  </tr>
                  <tr>
                    <th>Name:</th>
                    <td>ABC</td>
                    <th>Class:</th>
                    <td>2024</td>
                  </tr>
                  <tr>
                    <th>Email:</th>
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
