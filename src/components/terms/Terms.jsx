import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import "./Term.css";

const Terms = ({ isOpen, toggle }) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Terms of Use</ModalHeader>
      <ModalBody>
        <div className="terms-container">
          <h2>Terms</h2>
          <p>
            Welcome to our website. By accessing or using this website, you
            agree to be bound by the following terms and conditions. Please read
            carefully before using our website.
          </p>
          <h3>1. Scope</h3>
          <p>
            This website is provided to you for use subject to the terms and
            conditions set forth herein.
          </p>
          <h3>2. Use of Website</h3>
          <p>
            When you access our website, you agree to use it only for lawful
            purposes and in accordance with these terms and conditions.
          </p>
          <h3>3. Changes</h3>
          <p>
            We may change these terms and conditions at any time by updating
            this page. You should check this page regularly to keep up-to-date
            with any changes.
          </p>
          <h3>4. Consent</h3>
          <p>By using our website, you consent to our terms and conditions.</p>
          <h3>5. Contact Us</h3>
          <p>
            If you have any questions or suggestions regarding these terms and
            conditions, please contact us.
          </p>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default Terms;
