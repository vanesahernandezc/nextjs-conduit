"use client";
import React, { useEffect, useState } from "react";
import { IArticle } from "../interfaces/IArticle";
import Image from "next/image";
//TODO: make the link in the article map
//TODO: the toggle button in profile page and home page
type Response = {
  articles: IArticle[];
};

const MyArticles = () => {
  const [articles, setArticles] = useState<IArticle[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const item = localStorage.getItem("userLogged");
        if (!item) {
          return;
        }
        const user = JSON.parse(item);
        const response = await fetch(
          `https://api.realworld.io/api/articles?author=${user.username}&limit=5&offset=0`,
          {
            method: "GET",
            headers: {
              authorization: `Bearer ${user.token}`,
              "content-type": "application/json",
            },
          }
        );
        const data: Response = await response.json();
        setArticles(data.articles);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {articles.map((article, index) => (
        <div key={index} className="article-preview">
          <div className="article-meta">
            <a href="profile.html">
              <Image
                width={32}
                height={32}
                alt="profile-picture"
                src={article.author.image}
              />
            </a>
            <div className="info">
              <a href="" className="author">
                {article.author.username}
              </a>
              <span className="date">
                {new Date(article.createdAt).toDateString()}
              </span>
            </div>
            <button className="btn btn-outline-primary btn-sm pull-xs-right">
              <i className="ion-heart"></i> {article.favoritesCount}
            </button>
          </div>
          <a href="" className="preview-link">
            <h1>{article.title}</h1>
            <p>{article.description}</p>
            <span>Read more...</span>
          </a>
        </div>
      ))}
    </>
  );
};

export default MyArticles;
