import React from "react";
import { Link } from "react-router-dom";

function LinkPage() {
  return (
    <h1>
      Links <br />
      Public
      <br />
      <Link to="/register">Register</Link> <br />
      <Link to="/login">Login</Link>
      <br />
      Private <br />
      <Link to="/editor">Go to editor page</Link>
      <br />
      <Link to="/">Go to Adim Home</Link>
      <br />
      <Link to="/admin">Go to Admin</Link>
      <br />
      <button>Sign Out</button>
    </h1>
  );
}

export default LinkPage;
