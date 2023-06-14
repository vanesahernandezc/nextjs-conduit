"use client";
import React, { useState } from "react";
import Navigation from "../components/Navigation";
//TODO: how to pick this data
// const registerUser =async(form.email:any )=>{
//check empty or type of email
const registerUser = async (
  username: string,
  email: string,
  password: string,
  setError: any
) => {
  try {
    const api = await fetch("https://api.realworld.io/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: {
          username,
          email,
          password,
        },
      }),
    });
    if (!api.ok) {
      setError(true);
      return;
    }
    return api.json();
  } catch (error) {
    console.error(error);
  }
};

export default function Register() {
  const [{ username, email, password }, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const [errorEmailEmpty, setErrorEmailEmpty] = useState(false);
  const [errorUsernameEmpty, setErrorUsernameEmpty] = useState(false);
  const [errorPasswordEmpty, setErrorPasswordEmpty] = useState(false);
  const [errorTypeEmail, setErrorTypeEmail] = useState(false);
  const onChange = (e: any) => {
    setForm((form) => ({
      ...form,
      [e.target.name]: e.target.value,
    }));
  };
  function validateEmail(email: string) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
  const handleRegister = async (e: any) => {
    e.preventDefault();
    // check for errors in form input fields
    setErrorTypeEmail(false);
    if (!validateEmail(email)) {
      setErrorTypeEmail(true);
      return;
    }
    setErrorUsernameEmpty(false);
    setErrorEmailEmpty(false);
    setErrorPasswordEmpty(false);
    const emptyUsername = username.trim() === "";
    setErrorUsernameEmpty(emptyUsername);
    const emptyEmail = email.trim() === "";
    setErrorEmailEmpty(emptyEmail);
    const emptyPassword = password.trim() === "";
    setErrorPasswordEmpty(emptyPassword);

    if (emptyEmail || emptyPassword || emptyUsername) {
      return;
    }
    await registerUser(username, email, password, setError);
  };
  return (
    <>
      <Navigation />
      <div className="auth-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Sign up</h1>
              <p className="text-xs-center">
                <a href="">Have an account?</a>
              </p>
              {error ? (
                <ul className="error-messages">
                  <li>That username or email is already taken</li>
                </ul>
              ) : (
                ""
              )}

              {errorTypeEmail ? (
                <ul className="error-messages">
                  <li>That email is not valid</li>
                </ul>
              ) : (
                ""
              )}
              {errorUsernameEmpty ? (
                <ul className="error-messages">
                  <li>That email is empty</li>
                </ul>
              ) : (
                ""
              )}
              {errorEmailEmpty ? (
                <ul className="error-messages">
                  <li>That email is empty</li>
                </ul>
              ) : (
                ""
              )}
              {errorPasswordEmpty ? (
                <ul className="error-messages">
                  <li>That password is empty</li>
                </ul>
              ) : (
                ""
              )}
              <form>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Username"
                    id="username"
                    name="username"
                    value={username}
                    onChange={onChange}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="email"
                    placeholder="Email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={onChange}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="password"
                    placeholder="Password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={onChange}
                  />
                </fieldset>
                <button
                  onClick={handleRegister}
                  className="btn btn-lg btn-primary pull-xs-right"
                >
                  Sign up
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
