import React, { useEffect, useRef } from "react";
import { useState } from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";
// import Axios from "./api/Axios";
import { useAuthCpntext } from "./context/AuthContext";
const LOG_URL = "http://localhost:3500/auth";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";

  const { setData: setAuth } = useAuthCpntext();
  const userRef = useRef();
  const errRef = useRef();
  let { state } = useLocation();
  console.log(state);

  const [user, setUser] = useState("");
  const [passwrd, setPassWrd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    setPassWrd("");
    setUser("");
    setErrMsg("");
  }, [setErrMsg, setPassWrd, setUser]);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  const handleSubmit = async function (e) {
    e.preventDefault();
    try {
      const response = await fetch(LOG_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: user,
          password: passwrd,
          id: user.substring(0, 3) + passwrd.substring(0, 3),
        }),
      });

      const data = await response.json();

      if (data) {
        console.log(data);
        setAuth({
          username: user,
          password: passwrd,
          id: user.substring(0, 3) + passwrd.substring(0, 3),
        });
        setErrMsg("");
        navigate(from, { replace: true });
      } else {
        setErrMsg("No server response, Login Failed");
      }
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No server response !");
      } else {
        setErrMsg("Somethongs went wrong !");
      }
      errRef?.current?.focus();
    } finally {
      setPassWrd("");
      setUser("");
    }
  };

  return (
    <section className="form">
      <h2>Sign In</h2>
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username : </label>
          <input
            type="text"
            id="usename"
            autoComplete="false"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            ref={userRef}
          />
        </div>
        <div>
          <label htmlFor="password">Password : </label>
          <input
            type="password"
            id="password"
            value={passwrd}
            onChange={(e) => setPassWrd(e.target.value)}
          />
        </div>
        <button>Sign in</button>
      </form>
      <div className="issue">
        Dont have and account? <br />
        <Link to="/register">create it</Link>
      </div>
    </section>
  );
}

export default Login;
