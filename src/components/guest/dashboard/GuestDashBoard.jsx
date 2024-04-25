import { useEffect, useState } from "react";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";
import './GuestDashBoardStyle.css';

function ApprovedSubmissions() {
  const [submissions, setSubmissions] = useState([]);
  const apiUrl = "http://localhost:3001/submissions"
  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        // Fetch data from the endpoint
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const submissionsData = await response.json();

        // Set state with all submissions
        setSubmissions(submissionsData);
      } catch (error) {
        console.error("Error fetching submissions:", error);
      }
    };

    fetchSubmissions();
  }, []);

  return (
    <div>
      <h2 style={{ textAlign: "center" }}> Submissions</h2>
      <div className="card-container">
        {submissions.map((submission) => (
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
              <CardText>Student ID: {submission.student_id}</CardText>
              <CardText>Course: {submission.course_name}</CardText>
              <CardText>Status: {submission.status}</CardText>
              <CardText>Grade: {submission.grade}</CardText>
              <CardText>Files:</CardText>
              <ul>
                {submission.files.map((file, index) => (
                  <li key={index}>
                    <a
                      href={`${file.content}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {file.name}
                    </a>
                  </li>
                ))}
              </ul>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default ApprovedSubmissions;
