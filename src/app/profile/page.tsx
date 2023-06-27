"use client";
import Image from "next/image";
import Navigation from "../components/Navigation";
import MyArticles from "../components/MyArticles";
import FavoritedArticles from "../components/FavoritedArticles";
import { useState } from "react";

//TODO: Edit profile settings button
type User = {
  email: string;
  token: string;
  username: string;
  bio: string;
  image: string;
};

export default function Profile() {
  const [toggleNav, setToggleNav] = useState(true);
  const [isUserProfile, setIsUserProfile] = useState(null);
  const item = localStorage.getItem("userLogged");
  const user: User = item ? JSON.parse(item) : null;
  // if(user.username === ){
  //   setIsUserProfile(true);
  // }
  return (
    <>
      <Navigation />
      <div className="profile-page">
        <div className="user-info">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-md-10 offset-md-1">
                <Image
                  alt="lala"
                  width={26}
                  height={26}
                  src={user.image}
                  className="user-img"
                />
                <h4>{user.username}</h4>
                <p>{user.bio}</p>

                <a
                  className="btn btn-sm btn-outline-secondary action-btn"
                  href="/settings"
                >
                  <i className="ion-gear-a"></i> Edit Profile Settings
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <div className="articles-toggle">
                <ul className="nav nav-pills outline-active">
                  <li className="nav-item">
                    <button
                      className={toggleNav ? "nav-link active" : "nav-link"}
                      onClick={() => setToggleNav(true)}
                    >
                      My Articles
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className={toggleNav ? "nav-link" : "nav-link active"}
                      onClick={() => setToggleNav(false)}
                    >
                      Favorited Articles
                    </button>
                  </li>
                </ul>
              </div>
              {toggleNav ? <MyArticles /> : <FavoritedArticles />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
