"use client";
import { useState } from "react";
import Navigation from "../components/Navigation";

const loginUser = async (email: string, password: string) => {
  try {
    const result = await fetch(`https://api.realworld.io/api/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: {
          email,
          password,
        },
      }),
    });
    return result.json();
  } catch (error) {
    console.log(error);
  }
};

export default function Login() {
  const [{ email, password }, setForm] = useState({ email: "", password: "" });

  const onChange = (e: any) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;

    setForm((form) => ({ ...form, [name]: value }));
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();
    await loginUser(email, password);
  };

  return (
    <>
      <Navigation />
      <div className="auth-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Sign in</h1>
              <p className="text-xs-center">
                <a href="">Need an account?</a>
              </p>

              {/* <ul className="error-messages">
                <li>That email is already taken</li>
              </ul> */}

              <form>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
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
                    name="password"
                    placeholder="Password"
                    id="password"
                    value={password}
                    onChange={onChange}
                  />
                </fieldset>
                <button
                  onClick={handleLogin}
                  className="btn btn-lg btn-primary pull-xs-right"
                >
                  Sign in
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
