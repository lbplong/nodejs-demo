/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Account from "../../API/Module/Account";
import CheckIn from "../../API/Module/CheckIn";
import "./Register.css";

export default function Register() {
  const navigate = useNavigate();
  const [isPersonal, setIsPersonal] = useState(true);
  const [isMale, setIsMale] = useState(true);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const _handlerChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const _handlerChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const _handlerChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const _handleSubmitRegistration = async (e) => {
    e.preventDefault();
    const data = { username, email, password };
    console.log(data);
    const registerResult = await Account.register(data);
    if (registerResult.isAxiosError) {
      setErrorMessage(registerResult.response.data.message);
    } else {
      localStorage.setItem("token", registerResult.data.accessToken);
      localStorage.setItem("refreshToken", registerResult.data.refreshToken);
      navigate("/");
    }
  };

  const _handleChangePersonal = () => {
    setIsPersonal(!isPersonal);
  };

  const _handleChangeMale = () => {
    setIsMale(!isMale);
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
      <div className="testbox">
        <h1>Registration</h1>

        <form onSubmit={_handleSubmitRegistration}>
          <hr />
          <h4 className="errorMessage">{errorMessage}</h4>
          <div className="accounttype">
            <input
              type="radio"
              value="personal"
              id="personal"
              name="accounttype"
              defaultChecked={isPersonal}
              onChange={_handleChangePersonal}
            />
            <label className="radio">Personal</label>
            <input
              type="radio"
              value="company"
              id="company"
              name="accounttype"
              defaultChecked={!isPersonal}
              onChange={_handleChangePersonal}
            />
            <label className="radio">Company</label>
          </div>
          <hr />
          <label id="icon" className="">
            <em className="icon-envelope "></em>
          </label>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Email"
            onChange={_handlerChangeEmail}
            required
          />
          <label id="icon">
            <em className="icon-user"></em>
          </label>
          <input
            type="text"
            name="username"
            onChange={_handlerChangeUsername}
            id="username"
            placeholder="Name"
            required
          />
          <label id="icon">
            <em className="icon-shield"></em>
          </label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={_handlerChangePassword}
            placeholder="Password"
            required
          />
          <div className="gender">
            <input
              type="radio"
              value="male"
              id="male"
              name="sex"
              defaultChecked={isMale}
              onChange={_handleChangeMale}
            />
            <label className="radio">Male</label>
            <input
              type="radio"
              value="female"
              id="female"
              name="sex"
              defaultChecked={!isMale}
              onChange={_handleChangeMale}
            />
            <label className="radio">Female</label>
          </div>
          <p>
            By clicking Register, you agree on our{" "}
            <Link to="#">terms and condition</Link>.<br />
            <Link to="/login"> login</Link>
          </p>
          <input type="submit" className="button" value="Register" />
        </form>
      </div>
    </>
  );
}
