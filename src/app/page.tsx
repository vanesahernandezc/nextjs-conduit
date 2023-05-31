"use client";
import Image from "next/image";
import Navigation from "./components/Navigation";
import { useEffect } from "react";
import getTags from "@/services/getTags";
import { PopularTags } from "./components/PopularTags";

//TODO: page just in not sign in mode
//TODO: navigation optional
export default async function Home() {
  return (
    <>
      <Navigation />
      <div className="home-page">
        <div className="banner">
          <div className="container">
            <h1 className="logo-font">conduit</h1>
            <p>A place to share your knowledge.</p>
          </div>
        </div>

        <div className="container page">
          <div className="row">
            <div className="col-md-9">
              <div className="feed-toggle">
                <ul className="nav nav-pills outline-active">
                  {/* <li className="nav-item">
                    <a className="nav-link disabled" href="">
                      Your Feed
                    </a>
                  </li> */}
                  <li className="nav-item">
                    <a className="nav-link active" href="">
                      Global Feed
                    </a>
                  </li>
                </ul>
              </div>

              <div className="article-preview">
                <div className="article-meta">
                  <a href="profile.html">
                    <Image
                      width={32}
                      height={32}
                      alt="profile-picture"
                      src="https://i.imgur.com/Qr71crq.jpg"
                    />
                  </a>
                  <div className="info">
                    <a href="" className="author">
                      Eric Simons
                    </a>
                    <span className="date">January 20th</span>
                  </div>
                  <button className="btn btn-outline-primary btn-sm pull-xs-right">
                    <i className="ion-heart"></i> 29
                  </button>
                </div>
                <a href="" className="preview-link">
                  <h1>How to build webapps that scale</h1>
                  <p>This is the description for the post.</p>
                  <span>Read more...</span>
                </a>
              </div>

              <div className="article-preview">
                <div className="article-meta">
                  <a href="profile.html">
                    <Image
                      width={32}
                      height={32}
                      alt="username"
                      src="https://i.imgur.com/N4VcUeJ.jpg"
                    />
                  </a>
                  <div className="info">
                    <a href="" className="author">
                      Albert Pai
                    </a>
                    <span className="date">January 20th</span>
                  </div>
                  <button className="btn btn-outline-primary btn-sm pull-xs-right">
                    <i className="ion-heart"></i> 32
                  </button>
                </div>
                <a href="" className="preview-link">
                  <h1>lala</h1>
                  <p>This is the description for the post.</p>
                  <span>Read more...</span>
                </a>
              </div>
            </div>

            <PopularTags />
          </div>
        </div>
      </div>
    </>
  );
}
