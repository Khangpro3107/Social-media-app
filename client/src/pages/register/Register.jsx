import axios from "axios";
import { useRef } from "react";
import { useNavigate } from "react-router";
import "./register.css";

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post("/auth/register", user);
        navigate("/login");
      } catch (error) {
        console.log(error);
      }
    }
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
              type="text"
              ref={username}
              placeholder="Username"
              className="loginInput"
            />
            <input
              required
              type="email"
              ref={email}
              placeholder="Email"
              className="loginInput"
            />
            <input
              required
              type="password"
              ref={password}
              placeholder="Password"
              className="loginInput"
            />
            <input
              required
              type="password"
              ref={passwordAgain}
              placeholder="Password Again"
              className="loginInput"
            />
            <button type="submit" className="loginButton">
              Sign Up
            </button>
            <button
              className="loginRegisterButton"
              onClick={() => {
                navigate("/login");
              }}
            >
              Log into Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
