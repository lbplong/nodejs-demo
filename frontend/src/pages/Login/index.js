/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Account from "../../API/Module/Account";
import CheckIn from "../../API/Module/CheckIn";
import "./LoginStyle.css";

export default function Login() {
  const [errorMessage, setErrorMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const _handlerChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const _handlerChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const _handlerSubmit = async (e) => {
    e.preventDefault();
    const data = { username, password };

    const loginResult = await Account.login(data);
    console.log(loginResult.isAxiosError);
    if (loginResult.isAxiosError) {
      setErrorMessage(loginResult.response.data.message);
      console.log(loginResult.response);
    } else {
      localStorage.setItem("token", loginResult.data.accessToken);
      localStorage.setItem("refreshToken", loginResult.data.refreshToken);
      navigate("/");
    }
  };

  const _checkIn = async () => {
    const checkInResult = await CheckIn.checkIn();
    if (!checkInResult.isAxiosError) {
      navigate("/");
    }
  };

  useEffect(() => {
    _checkIn();
  }, []);

  return (
    <>
      <div className="login-box">
        <h2>Login</h2>
        <h6 className="error-message">{errorMessage}</h6>
        <form onSubmit={_handlerSubmit}>
          <div className="user-box">
            <input
              type="text"
              name="username"
              id="username"
              required
              value={username}
              onChange={_handlerChangeUsername}
            />
            <label>Username</label>
          </div>

          <div className="user-box">
            <input
              type="password"
              name="password"
              id="password"
              required
              value={password}
              onChange={_handlerChangePassword}
            />
            <label>Password</label>
          </div>
          <div className="btn-login">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <input type="submit" value="Login" className="btn-submit-form" />
          </div>
        </form>
        <br />
        <Link to="/register"> registration</Link>
      </div>
    </>
  );
}
