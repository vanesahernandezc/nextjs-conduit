"use client";
import { useState } from "react";
import Navigation from "../components/Navigation";
import { useRouter } from "next/navigation";

const loginUser = async (
  email: string,
  password: string,
  setError: any,
  setIsLoading: any,
  router: any
) => {
  try {
    setIsLoading(true);
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
    const responseBody = await result.json();

    if (!result.ok) {
      setError(true);
      setIsLoading(false);
      return;
    }
    localStorage.setItem("userLogged", JSON.stringify(responseBody.user.token));
    router.push("/");
    return await result.json();
  } catch (error) {
    console.error(error);
    setIsLoading(true);
  } finally {
    setIsLoading(false);
  }
};

export default function Login() {
  const [{ email, password }, setForm] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorEmailEmpty, setErrorEmailEmpty] = useState(false);
  const [errorPasswordEmpty, setErrorPasswordEmpty] = useState(false);
  const [errorTypeEmail, setErrorTypeEmail] = useState(false);
  const router = useRouter();
  const onChange = (e: any) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;

    setForm((form) => ({ ...form, [name]: value }));
  };
  function validateEmail(email: string) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setErrorTypeEmail(false);
    setErrorEmailEmpty(false);
    setErrorPasswordEmpty(false);
    if (!validateEmail(email)) {
      setErrorTypeEmail(true);
      return;
    }

    const emptyEmail = email.trim() === "";
    setErrorEmailEmpty(emptyEmail);
    const emptyPassword = password.trim() === "";
    setErrorPasswordEmpty(emptyPassword);

    if (emptyEmail || emptyPassword) {
      return;
    }
    setError(false);
    await loginUser(email, password, setError, setIsLoading, router);
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

              {error ? (
                <ul className="error-messages">
                  <li>email or password is invalid</li>
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
              {errorTypeEmail ? (
                <ul className="error-messages">
                  <li>That email is not valid</li>
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
                    placeholder="Email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={onChange}
                    disabled={isLoading}
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
                    disabled={isLoading}
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
