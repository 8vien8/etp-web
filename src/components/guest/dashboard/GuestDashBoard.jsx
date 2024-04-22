import React, { useState, useEffect } from "react";
import {
  Cart,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
} from "reactstrap";

function GuestDashBoard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("db.json")
      .then((respone) => {
        if (!respone.ok) {
          throw new Error("Network respone had problem");
        }
        return respone.json();
      })
      .then((jsonData) => {
        setData(jsonData);
      })
      .catch((error) => {
        console.log("There was a problem fetching the data! ", error);
      });
  }, []);

  return (
    <div>
      <div className="col-6">
        <Cart>
          <CardBody>
            <CardTitle tag="h5">{data.coordinators[0].name}</CardTitle>
            <CardSubtitle tag="h6" className="mb-2 text-muted">
              {data.coordinators[0].coordinatorID}
            </CardSubtitle>
            <CardText>Email: {data.coordinators[0].email}</CardText>
          </CardBody>
          <img
            width="100%"
            src={data.coordinators[0].avatarUrl}
            alt="Coordinator Avatar"
          />
          <CardBody>
            <CardTitle tag="h5">{data.coordinators[1].name}</CardTitle>
            <CardSubtitle tag="h6" className="mb-2 text-muted">
              {data.coordinators[1].coordinatorID}
            </CardSubtitle>
            <CardText>Email: {data.coordinators[1].email}</CardText>
          </CardBody>
          <img
            width="100%"
            src={data.coordinators[1].avatarUrl}
            alt="Coordinator Avatar"
          />
        </Cart>
      </div>
      <div className="col-6"></div>
    </div>
  );
}

export default GuestDashBoard;
