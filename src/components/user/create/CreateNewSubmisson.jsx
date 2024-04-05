import React from "react";
import { Container, Row, Col, Table, Button, Input } from "reactstrap";
import "./CreateNewSubmissionStyle.css";
import Terms from "../../terms/Terms";

function CreateNewSubmissions() {
  return (
    <div>
      <Container>
        <Row>
          <div className="col-8">
            <h2>Welcome, Student!</h2>
            <h2>Article Submission</h2>
            <p>Title</p>
            <Input
              type="text"
              name="article-title"
              placeholder="Enter article title"
            />
            <p>Author name</p>
            <Input
              type="text"
              name="author-name"
              placeholder="Enter author name"
            />
            <p>Article content</p>
            <Input
              className="article-content"
              type="text"
              placeholder="Enter article content"
            />
            <p>Upload Article (World document)</p>
            <Input type="file" name="article-file" placeholder="Choose file" />
            <p>Upload Image</p>
            <Input type="file" name="image-file" placeholder="Choose file" />
            <Input
              type="checkbox"
              onChange={(e) => console.log(e.target.checked)}
            />{" "}
            <strong>I agree to Terms and Conditions</strong>
            <Button>Submit</Button>
          </div>
          <div className="col-4">
            <h2>Submitted Article</h2>
            <Table size="sm">
              <thead>
                <tr>
                  <th>Course</th>
                  <th>Author</th>
                </tr>
              </thead>
              <tbody></tbody>
            </Table>
          </div>
        </Row>
      </Container>
    </div>
  );
}

export default CreateNewSubmissions;
