import React, { useState } from "react";

/// React router dom
import { Link } from "react-router-dom";

/// images
import companyLogo from "../../../images/companyLogo.png";
import { FaHome } from "react-icons/fa";
const NavHader = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <div className="nav-header">
      <Link to="/" className="brand-logo">
        {toggle ? (
          <FaHome size={30} />
        ) : (
          <img
            className="brand-title"
            src={companyLogo}
            width="193"
            height="50"
            alt=""
          />
        )}
      </Link>

      <div className="nav-control" onClick={() => setToggle(!toggle)}>
        <div className={`hamburger ${toggle ? "is-active" : ""}`}>
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
        </div>
      </div>
    </div>
  );
};

export default NavHader;
