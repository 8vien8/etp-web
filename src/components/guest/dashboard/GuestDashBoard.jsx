import { useState, useEffect } from "react";
import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
} from "reactstrap";
import data from "../../../../db.json";

function GuestDashBoard() {
  const [jsondata, setJsonData] = useState(null);

  useEffect(() => {
    fetch("db.json")
      .then((respone) => {
        if (!respone.ok) {
          throw new Error("Network respone had problem");
        }
        return respone.json();
      })
      .then((jsonData) => {
        setJsonData(jsonData);
      })
      .catch((error) => {
        console.log("There was a problem fetching the data! ", error);
      });
  }, []);

  return (
    <div>
      {data && data.submissions && data.submissions.length > 0 && (
        <div>
          <h2>Submissions</h2>
          {data.submissions.map((submission, index) => (
            <Card key={index} sm="6">
              <CardBody>
                <CardTitle tag="h5">{submission.submissionTitle}</CardTitle>
                <CardSubtitle tag="h6" className="mb-2 text-muted">
                  Student: {submission.studentName}
                </CardSubtitle>
                <CardText>Grade: {submission.grade}</CardText>
                <CardText>Comment: {submission.comment}</CardText>
              </CardBody>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default GuestDashBoard;
