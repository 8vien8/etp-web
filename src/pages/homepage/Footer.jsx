
import { Link } from "react-router-dom";
import "../style/footerStyle.css";

const Footer = () => {
  return (
    <footer>
      <div className="Footer-container">
        <p>
          <Link to="/">Copyright &copy; 2024</Link>
        </p>
        <p>
          <Link to="/privacy">Privacy & cookies</Link>
        </p>
        <p>
          <Link to="/help">Need more help?</Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
