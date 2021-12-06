import React from "react";
import { Link } from "react-router-dom";

const SingleReport = () => {
  return (
    <div>
      <Link to="/employees">
        <button
          type="button"
          className="btn btn-primary"
          style={{ textTransform: "capitalize" }}
        >
          back to emplyoees
        </button>
      </Link>
      <h1>SIngle Employee details</h1>
    </div>
  );
};

export default SingleReport;
