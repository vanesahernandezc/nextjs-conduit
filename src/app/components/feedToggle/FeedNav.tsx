"use client";
import { useState } from "react";
import Articles from "../articles/Articles";
import MyFeed from "../MyFeed";

export default function FeedNav() {
  const [toggleNav, setToggleNav] = useState(true);
  return (
    <>
      <div className="feed-toggle">
        <ul className="nav nav-pills outline-active">
          <li className="nav-item">
            <button
              className={toggleNav ? "nav-link active" : "nav-link "}
              onClick={() => setToggleNav(true)}
            >
              Your Feed
            </button>
          </li>
          <li className="nav-item">
            <button
              className={toggleNav ? "nav-link" : "nav-link active"}
              onClick={() => setToggleNav(false)}
            >
              Global Feed
            </button>
          </li>
        </ul>
      </div>
      {toggleNav ? <MyFeed /> : <Articles />}
    </>
  );
}
