import React, { useEffect, useRef } from "react";
import { useState } from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";
// import Axios from "./api/Axios";
import { useAuthCpntext } from "./context/AuthContext";
import Axios from "./api/Axios";
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
      const response = await Axios.post(
        LOG_URL,
        JSON.stringify({
          name: user,
          password: passwrd,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log(response.data.accesToken);
      console.log(response.data.roles);
      console.log(response.data);

      setAuth({
        name: user,
        password: passwrd,
        roles: response.data.roles,
      });

      setErrMsg("");
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No server response !");
      } else if (!err.response?.status === 400) {
        setErrMsg("Missing userName and Password");
      } else if (!err?.response.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
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
