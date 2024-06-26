import { useState } from "react";
import { Link } from "react-router-dom";
import Login from "../../components/loginForm/LoginForm.jsx";
import Footer from "./Footer.jsx";
import "../style/homeStyle.css";
import { Button } from "reactstrap";

function Home() {
  const [showLoginForm, setLoginForm] = useState(false);
  const handleLogin = () => {
    setLoginForm(!showLoginForm);
  };

  return (
    <div className="homepage-container">
      <div className="homepage-logo"></div>
      <div className="start-button">
        {!showLoginForm && (
          <Link to="/login">
            <Button onClick={handleLogin}>Start Journey</Button>
          </Link>
        )}
        <div className="form">
          {showLoginForm && <Login />}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
