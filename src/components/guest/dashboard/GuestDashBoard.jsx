import { useEffect, useState } from "react";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";
import db1 from "../../../../db1.json";
// import "./GuestDashBoardStyle.css";

function ApprovedSubmissions() {
  const [approvedSubmissions, setApprovedSubmissions] = useState([]);

  useEffect(() => {
    const fetchApprovedSubmissions = async () => {
      try {
        // Fetch data from imported JSON file
        const submissions = db1.submissions;

        // Filter approved submissions
        const approved = submissions.filter(
          (submission) =>
            submission.status === "Approve" ||
            submission.status === "Reject" ||
            submission.status === ""
        );

        // Set state with approved submissions
        setApprovedSubmissions(approved);
      } catch (error) {
        console.error("Error fetching approved submissions:", error);
      }
    };

    fetchApprovedSubmissions();
  }, []);

  return (
    <div className="card-container">
      <h2 style={{ textAlign: "center" }}> Submissions</h2>
      <ul>
        {approvedSubmissions.map((submission) => (
          <Card
            style={{ width: "25%" }}
            key={submission.id}
            className="mb-3, card"
          >
            <CardBody>
              <CardTitle style={{ textAlign: "center" }} tag="h5">
                <strong>Article: {submission.course_name}</strong>
              </CardTitle>
              <CardText tag="h5">
                <strong>{submission.title}</strong>
              </CardText>
              <CardText>ID: {submission.id}</CardText>
              <CardText>Student ID: {submission.student_id}</CardText>
              <CardText>Course: {submission.course_name}</CardText>
              <CardText>Status: {submission.status}</CardText>
              <CardText>Grade: {submission.grade}</CardText>
              <ul>
                {submission.files.map((file, index) => (
                  <li key={index}>
                    <a
                      href={`${file}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {file}
                    </a>
                  </li>
                ))}
              </ul>
            </CardBody>
          </Card>
        ))}
      </ul>
    </div>
  );
}

export default ApprovedSubmissions;
