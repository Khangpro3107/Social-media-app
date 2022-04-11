import { useContext, useRef } from "react";
import "./login.css";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router";

export default function Login() {
  const email = useRef();
  const password = useRef();
  const navigate = useNavigate();
  const { isFetching, dispatch } = useContext(AuthContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Lamasocial</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Lamasocial.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={(e) => handleSubmit(e)}>
            <input
              required
              ref={email}
              type="email"
              placeholder="Email"
              className="loginInput"
            />
            <input
              minLength="3"
              required
              ref={password}
              type="password"
              placeholder="Password"
              className="loginInput"
            />
            <button className="loginButton" type="submit">
              {isFetching ? (
                <CircularProgress color="secondary" size="20px" />
              ) : (
                "Log In"
              )}
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <button
              className="loginRegisterButton"
              onClick={() => {
                navigate("/register");
              }}
            >
              Create a New Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
