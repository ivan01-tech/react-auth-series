import axios from "axios";
import Axios from "./api/Axios";
import { useEffect, useRef, useState } from "react";
import { AiOutlineCheck, AiOutlineExclamationCircle } from "react-icons/ai";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const NAME_REGEX = /^[A-Za-z][A-Za-z0-9-_]{3,24}$/;
const PWD_REGEX = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@$%#]).{8,24}$/;

const POST_URL = "/register";

function RegisterForm() {
  /**** DECLARATIONS */
  const userRef = useRef();
  // const pwdRef = useRef();
  const errRef = useRef();

  const [name, setName] = useState("");
  const [validName, setValidName] = useState(false);
  const [focusName, setFocusName] = useState(false);

  const [pwd, setpwd] = useState("");
  const [validpwd, setValidpwd] = useState(false);
  const [focusPwd, setFocusPwd] = useState(false);

  const [confirm, setconfirm] = useState("");
  const [validconfirm, setValidconfirm] = useState(false);
  const [focusConfirm, setFocusConfirm] = useState(false);

  const [errMsg, setErrMsg] = useState(false);
  const [success, setSuccess] = useState(false);

  /**SIDE EFFECT  */
  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = NAME_REGEX.test(name);
    console.log(result, name);
    setValidName(result);
  }, [name]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    console.log(result, pwd);
    setValidpwd(result);
    const matchPwd = pwd === confirm && Boolean(confirm);
    setValidconfirm(matchPwd);
    console.log("confirmm", matchPwd, confirm);
  }, [pwd, confirm]);
  // because we dont want to display error while the user is taping something
  useEffect(() => {
    setErrMsg("");
  }, [name, confirm, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const invalidName = NAME_REGEX.test(name);
    const invalidPwd = PWD_REGEX.test(pwd);
    const invalidCon = PWD_REGEX.test(confirm);
    if (!invalidName || !invalidPwd || !invalidCon) {
      setErrMsg("Invalid Input");
      return;
    }
    // console.log({ name, pwd });
    // setSuccess(true);

    try {
      const reponse = await Axios.post(
        POST_URL,
        JSON.stringify({ name, password: pwd }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          // withCredentials: true,
        }
      );
      console.log("====================================");
      console.log(reponse.accessToken);
      console.log(reponse.data);
      console.log(JSON.stringify(reponse));
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No server response !");
      } else {
        setErrMsg("Resgitration Failed", err.message);
      }
      errRef.current.focus();
      // console.log(err);
    }
  };

  return (
    <section onSubmit={handleSubmit} className="form">
      {success ? (
        <h2>Success!!</h2>
      ) : (
        <>
          <h2>Register</h2>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>

          <form>
            <div>
              <label htmlFor="username">
                Username:{" "}
                <span className={validName ? "valid" : "hide"}>
                  <AiOutlineCheck />
                </span>
                <span className={!validName && name ? "invalid" : "hide"}>
                  <FaTimes />
                </span>
              </label>
              <input
                required
                onChange={(e) => setName(e.target.value)}
                ref={userRef}
                autoComplete="false"
                type="text"
                id="username"
                aria-invalid={validName ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setFocusName(true)}
                onBlur={() => setFocusName(false)}
              />
              <p
                className={
                  !validName && Boolean(name) && focusName
                    ? "instruction"
                    : "offscreen"
                }
                id="uidnote"
              >
                <AiOutlineExclamationCircle />
                4 to 24 characters <br />
                Must begin with a letter <br />
                Letters , numbers, underscore allowed.
              </p>
            </div>
            <div>
              <label htmlFor="password">
                Password :{" "}
                <span className={validpwd ? "valid" : "hide"}>
                  <AiOutlineCheck />
                </span>
                <span className={!validpwd && pwd ? "invalid" : "hide"}>
                  <FaTimes />
                </span>
              </label>
              <input
                required
                onChange={(e) => setpwd(e.target.value)}
                type="password"
                id="password"
                aria-invalid={validpwd ? "false" : "true"}
                aria-describedby="pwdnote"
                onFocus={() => setFocusPwd(true)}
                onBlur={() => setFocusPwd(false)}
              />
              <p
                className={
                  !validpwd && Boolean(pwd) && focusPwd
                    ? "instruction"
                    : "offscreen"
                }
                id="pwdnote"
              >
                <AiOutlineExclamationCircle />
                8 to 24 characters <br />
                Must includes uppercase and lowercase and special characters.
                Allowed special characters:
                <span aria-label="at symbol">@ </span>
                <span aria-label="hastag"># </span>
                <span aria-label="exclamation mark">! </span>
                <span aria-label="dollar">$ </span>
                <span aria-label="percent">% </span>
              </p>
            </div>
            <div>
              <label htmlFor="confirm">
                Confirm Password :
                <span className={validconfirm ? "valid" : "hide"}>
                  <AiOutlineCheck />
                </span>
                <span className={!validconfirm && confirm ? "invalid" : "hide"}>
                  <FaTimes />
                </span>
              </label>
              <input
                required
                onChange={(e) => setconfirm(e.target.value)}
                type="password"
                id="confirm"
                aria-invalid={validpwd ? "false" : "true"}
                aria-describedby="cnfnote"
                onFocus={() => setFocusConfirm(true)}
                onBlur={() => setFocusConfirm(false)}
              />
              <p
                className={
                  !validconfirm && Boolean(confirm) && focusConfirm
                    ? "instruction"
                    : "offscreen"
                }
                id="pwdnote"
              >
                <AiOutlineExclamationCircle />
                Must match the first password input field
              </p>
            </div>
            <button
              disabled={validName && validconfirm && validpwd ? false : true}
            >
              Sign up
            </button>
          </form>
          <div className="issue">
            Already registred ? <br />
            <Link to="/login">sign in</Link>
          </div>
        </>
      )}
    </section>
  );
}

export default RegisterForm;
