import { Container, Row, Col, Table } from "reactstrap";
import "../../utils/style/profileStyle.css";
import Logout from '../../button/LogOut.jsx'
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
                  </tr>
                  <tr>
                    <th>Name:</th>
                  </tr>
                  <tr>
                    <th>Email:</th>
                  </tr>
                  <tr>
                    <th>Password:</th>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
          <Row>
            <Col>
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
                    <td>Graded</td>
                  </tr>
                  <tr>
                    <td>...</td>
                    <td>...</td>
                    <td>UnGraded</td>
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
