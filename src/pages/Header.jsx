import React from "react";

const Header = () => {
  return (
    <header
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        width: "100%",
        height: "100px",
      }}
    >
      <div
        className="logo-container"
        style={{ gridColumn: "1", width: "100px" }}
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/vi/b/bf/Official_logo_of_Greenwich_Vietnam.png"
          alt=""
          style={{ maxWidth: "100%", maxHeight: "100%" }}
        />
      </div>
    </header>
  );
};

export default Header;
