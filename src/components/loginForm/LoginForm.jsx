import { useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import "./styleLogin.css";
import { Link } from "react-router-dom";
import RegisterForm from "../registerForm/RegisterForm";
import Terms from "../terms/Terms";

function Login() {
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  const toggleTermsModal = () => {
    setShowTermsModal(!showTermsModal);
  };

  const handleRegister = () => {
    setShowRegistrationForm(!showRegistrationForm);
  };

  return (
    <div className="form-container">
      <div>
        <button onClick={toggleTermsModal}>Open Terms Modal</button>

        <Terms isOpen={showTermsModal} toggle={toggleTermsModal} />
      </div>
      {!showRegistrationForm && (
        <Form
          className="login-form"
          // onSubmit={handleSubmit}
        >
          <div className="form-header">
            <h1>Login</h1>
          </div>
          <FormGroup className="form-group">
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your school email..."
              required
            />
          </FormGroup>
          <FormGroup>
            <label>Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password..."
              required
            />
          </FormGroup>
          <div className="login-button">
            <Button type="submit">
              <b>Sign-in</b>
            </Button>
            <p>
              {" "}
              or{" "}
              <Link to="/register" onClick={handleRegister}>
                {" "}
                Register
              </Link>
            </p>
          </div>
          <div className="form-footer">
            <p>
              Forgot your password? <Link to="/reset">Reset now!</Link>
            </p>
          </div>
        </Form>
      )}
      {showRegistrationForm && <RegisterForm />}
    </div>
  );
}

export default Login;
