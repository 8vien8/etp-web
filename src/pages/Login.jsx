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
            <Label for="email">Email*</Label>
            <Input
              type="text"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password*</Label>
            <Input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormGroup>
          {passwordError && <div className="error">{passwordError}</div>}
          <Link to="/register">
            <div>
              <p>Do not have account? Click here to register</p>
            </div>
            <Button type="button" variant="primary">
              {" "}
              {/* Thay type thành "button" */}
              Next
            </Button>
          </Link>
        </form>
        {/* Add links for "Forgot password" and "Create account" if needed */}
      </div>
    </div>
  );
}

export default Login;
