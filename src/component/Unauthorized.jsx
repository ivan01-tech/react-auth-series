import React from "react";
import { useNavigate } from "react-router-dom";

function Unauthorized() {
  const navigate = useNavigate();

  function goback() {
    navigate(-1);
  }

  return (
    <>
      <h1>Unauthorized</h1>
      <button onClick={goback}>Go back</button>
    </>
  );
}

export default Unauthorized;
