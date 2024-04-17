import React from "react";
import { Button, Row, Col, Link, Table, Card } from "reactstrap";
import "../guest/guestStyle.css";

function Message() {
  return (
    <div>
      <div className="col-6">
        <Card inverse>
          <CardImg alt="Card image cap" src="" />
          <CardImgOverlay>
            <CardTitle tag="h5">Card Title</CardTitle>
            <CardText>
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </CardText>
            <CardText>
              <small className="text-muted">Last updated 3 mins ago</small>
            </CardText>
          </CardImgOverlay>
        </Card>
      </div>
      <div className="col-6">
        <Card inverse>
          <CardImg alt="Card image cap" src="" />
          <CardImgOverlay>
            <CardTitle tag="h5">Card Title</CardTitle>
            <CardText>
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </CardText>
            <CardText>
              <small className="text-muted">Last updated 3 mins ago</small>
            </CardText>
          </CardImgOverlay>
        </Card>
      </div>
    </div>
  );
}

export default Message;
