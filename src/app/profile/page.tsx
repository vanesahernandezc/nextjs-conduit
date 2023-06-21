"use client";
import Image from "next/image";
import Navigation from "../components/Navigation";
import MyArticles from "../components/MyArticles";

//TODO: Edit profile settings button
type User = {
  email: string;
  token: string;
  username: string;
  bio: string;
  image: string;
};

export default function Profile() {
  const item = localStorage.getItem("userLogged");
  const user: User = item ? JSON.parse(item) : null;

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
                <button className="btn btn-sm btn-outline-secondary action-btn">
                  <i className="ion-plus-round"></i>
                  &nbsp; Follow {user.username}
                </button>
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
                    <a className="nav-link active" href="">
                      My Articles
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="">
                      Favorited Articles
                    </a>
                  </li>
                </ul>
              </div>
              <MyArticles />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
