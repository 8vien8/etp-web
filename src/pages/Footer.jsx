import React from "react";
import "./style/footerStyle.css";

const Footer = () => {
  return (
    <footer>
      <div className="Footer-container">
        <p>
          <a href=".">Copyright &copy; 2024</a>
        </p>
        <p>
          <a href="."> Home </a>
        </p>
        <p>
          <a href="."> Privacy & cookies </a>
        </p>
        <p>
          <a href=".">Need more help?</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
