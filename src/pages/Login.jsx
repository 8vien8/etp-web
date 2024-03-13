import React, { useState } from "react";
import { FormGroup, Label, Input, Button } from "reactstrap";
import { Link } from "react-router-dom";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    // Implement login logic (BE API)

    if (!password) {
      setPasswordError("[Error text mesage]");
      return;
    }

    console.log("Login submitted:", email, password);
    setEmail(""); // Clear form after submission
    setPassword("");
  };

  return (
    <div className="login-container">
      {" "}
      <div className="logo-container">
        <img
          src="https://upload.wikimedia.org/wikipedia/vi/b/bf/Official_logo_of_Greenwich_Vietnam.png"
          alt="University of Greenwich logo"
        />
      </div>
      <div className="container">
        <h1>LOGIN</h1>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            {" "}
            {}
            <Input
              type="text"
              placeholder="Email*"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="password"
              placeholder="Password*"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormGroup>
          {passwordError && <div className="error">{passwordError}</div>}
          <Link to="/register" className="register-link">
            <div>
              <p className="register-text">
                Do not have account? Click here to register
              </p>
            </div>
            <Button type="button" variant="primary">
              {" "}
              Next
            </Button>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
