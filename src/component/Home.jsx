import React from "react";
import { Link } from "react-router-dom";
import useLogout from "../hooks/useLogout";

function Home() {
  const logut = useLogout();

  const signOut = function () {
    logut();
    navigator("/linkpage");
  };

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
      <button onClick={signOut}>Sign Out</button>
    </h1>
  );
}

export default Home;
