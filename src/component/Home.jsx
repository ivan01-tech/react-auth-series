import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <h1>
      Home
      <br />
      <Link to="/editor">Go to editor page</Link>
      <br />
      <Link to="/admin">Go to Adim page</Link>
      <br />
      <Link to="/lounge">Go to Lounge</Link>
      <br />
      <Link to="/linkpage">Go to Link page</Link>
      <button>Sign Out</button>
    </h1>
  );
}

export default Home;
