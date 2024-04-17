import React, { useState, useEffect } from "react";
import {
  Button,
  Row,
  Col,
  Link,
  Table,
  Card,
  CardImg,
  CardTitle,
  CardImgOverlay,
  CardText,
} from "reactstrap";
import "../guest/guestStyle.css";

function Guest() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("db.json")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleClick = (studentID) => {
    if (data && data.students) {
      const student = data.students.find((student) => student.id === studentID);
      if (student) {
        alert(
          `Student: ${student.name}\nEmail: ${student.email}\nAcademic Year: ${student.academicYear}`
        );
      }
    }
  };

  const Guest = () => {
    return (
      <div>
        <div>
          {data &&
            data.submissions.map((submission) => (
              <div
                className="col-6"
                key={submission.id}
                onClick={() => handleClick(submission.studentID)}
              >
                <Card inverse>
                  <CardImg
                    alt="Card image cap"
                    src="https://picsum.photos/900/270?grayscale"
                  />
                  <CardImgOverlay>
                    <CardTitle tag="h5">Card Title</CardTitle>
                    <CardText>
                      This is a wider card with supporting text below as a
                      natural lead-in to additional content. This content is a
                      little bit longer.
                    </CardText>
                    <CardText>
                      <small className="text-muted">
                        Last updated 3 mins ago
                      </small>
                    </CardText>
                  </CardImgOverlay>
                </Card>
              </div>
            ))}
        </div>
        <div>
          {data &&
            data.submissions.map((submission) => (
              <div
                className="col-6"
                key={submission.id}
                onClick={() => handleClick(submission.studentID)}
              >
                <Card inverse>
                  <CardImg
                    alt="Card image cap"
                    src="https://picsum.photos/900/270?grayscale"
                  />
                  <CardImgOverlay>
                    <CardTitle tag="h5">Card Title</CardTitle>
                    <CardText>
                      This is a wider card with supporting text below as a
                      natural lead-in to additional content. This content is a
                      little bit longer.
                    </CardText>
                    <CardText>
                      <small className="text-muted">
                        Last updated 3 mins ago
                      </small>
                    </CardText>
                  </CardImgOverlay>
                </Card>
              </div>
            ))}
        </div>
      </div>
    );
  };
}

export default Guest;
