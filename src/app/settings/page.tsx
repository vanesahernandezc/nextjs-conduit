"use client";
import React, { useState } from "react";
import Navigation from "../components/Navigation";
import { useRouter } from "next/navigation";

const updateUser = async (formData: any) => {
  try {
    const token = localStorage.getItem("userLogged");
    if (!token) {
      return;
    }
    const tokencito = JSON.parse(token);
    const response = await fetch("https://api.realworld.io/api/user", {
      method: "PUT",
      headers: {
        authorization: `Bearer ${tokencito}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        user: formData,
      }),
    });

    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export default function Settings() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    bio: "",
    image: "",
  });
  const { email, password, username, bio, image } = formData;
  const router = useRouter();
  const onChange = (e: any) => {
    const id = e.target.id;
    const value = e.target.value;
    setFormData((formData) => ({
      ...formData,
      [id]: value,
    }));
  };
  const handleUser = async (e: any) => {
    e.preventDefault();
    await updateUser(formData);
  };
  //Clean localStorage
  const logout = () => {
    localStorage.removeItem("userLogged");
    router.push("/");
  };
  //Check the inputs format before sending
  return (
    <>
      <Navigation />
      <div className="settings-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Your Settings</h1>

              <form>
                <fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="URL of profile picture"
                      value={image}
                      id="image"
                      onChange={onChange}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Your Name"
                      value={username}
                      id="username"
                      onChange={onChange}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <textarea
                      className="form-control form-control-lg"
                      rows={8}
                      placeholder="Short bio about you"
                      value={bio}
                      id="bio"
                      onChange={onChange}
                    ></textarea>
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Email"
                      value={email}
                      id="email"
                      onChange={onChange}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="password"
                      placeholder="Password"
                      value={password}
                      id="password"
                      onChange={onChange}
                    />
                  </fieldset>
                  <button
                    onClick={handleUser}
                    className="btn btn-lg btn-primary pull-xs-right"
                  >
                    Update Settings
                  </button>
                </fieldset>
              </form>
              <hr />
              <button className="btn btn-outline-danger" onClick={logout}>
                Or click here to logout.
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
