import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">
      <div className="copyright">
        <p>
          Copyright © by{" "}
          <a href="https://theappideas.com/"  target="_blank">
            The App Ideas
          </a>{" "}
          {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
};

export default Footer;
