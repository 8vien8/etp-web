import React from "react";
import { Container, Row, Col, Table, Button, Input } from "reactstrap";
import "./createnewuserStyle.css";

function CreateNewUser() {
  return (
    <div>
      <div></div>
      <Table responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>ID</th>
            <th>Classroom</th>
            <th>Mark</th>
            <th>Createt By</th>
            <th>Modified By</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>
              <Button>SLL</Button>
            </td>
            <td>
              <Input type="number"></Input>
            </td>
            <td>
              <Button>Approve</Button>
            </td>
            <td>
              <Button>Reject</Button>
            </td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>
              <Button>Sll</Button>
            </td>
            <td>
              <Input type="number"></Input>
            </td>
            <td>
              <Button>Approve</Button>
            </td>
            <td>
              <Button>Reject</Button>
            </td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>
              <Button>Sll</Button>
            </td>
            <td>
              <Input type="number"></Input>
            </td>
            <td>
              <Button>Approve</Button>
            </td>
            <td>
              <Button>Reject</Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default CreateNewUser;
