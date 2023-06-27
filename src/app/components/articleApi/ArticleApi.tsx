"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import ToggleButtonArticle from "../ToggleButtonArticle";
//no fetching comments
//TODO: send comments
export type Article = {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: Date;
  updatedAt: Date;
  favorited: boolean;
  favoritesCount: number;
  author: {
    username: string;
    bio: string;
    image: string;
    following: boolean;
  };
};
export type Comment = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  body: string;
  author: {
    username: string;
    bio: string;
    image: string;
    following: boolean;
  };
};
async function fetchArticleData(slug: any) {
  const response = await fetch(`https://api.realworld.io/api/articles/${slug}`);
  const { article }: { article: Article } = await response.json();
  return article;
}
async function fetchComments(slug: any) {
  const response = await fetch(
    `https://api.realworld.io/api/articles/${slug}/comments`
  );
  const { comments }: { comments: Comment[] } = await response.json();
  return comments;
}
//fetch q solo envie fncion no q se use
async function fetchCreateComment(slug: any, comments: any) {
  try {
    const item = localStorage.getItem("userLogged");
    const user = item ? JSON.parse(item) : null;

    const response = await fetch(
      `https://api.realworld.io/api/articles/${slug}/comments`,
      {
        method: "POST",
        headers: {
          authorization: `Bearer ${user.token}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          comment: comments,
        }),
      }
    );
    const data = await response.json();
  } catch (error) {
    console.error(error);
  }
}
type User = {
  email: string;
  token: string;
  username: string;
  bio: string;
  image: string;
};
function ArticleApi() {
  const params = useParams();
  const slug = params?.slug;

  const [articleData, setArticleData] = useState<Article>();
  const [comments, setComments] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);

  const item = localStorage.getItem("userLogged");
  const user: User = item ? JSON.parse(item) : null;

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchArticleData(slug);
        const comment = await fetchComments(slug);

        setArticleData(data);
        setComments(comment);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching article data:", error);
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);
  const CreateComment = async (e: any) => {
    e.preventDefault();
    await fetchCreateComment(slug, comments);
    await fetchComments(slug);
  };
  //TODO: error en el any en el useState al no poner any
  //TODO: articleData. title undefined
  //test delete edit comment with my own account
  //make functionality in edit and delete botton and post comment
  if (isLoading) {
    return null; // or a loading indicator
  }
  //Follow buttons
  //! at the end of image

  return (
    <>
      <div className="article-page">
        <div className="banner">
          <div className="container">
            <h1>{articleData?.title}</h1>

            <div className="article-meta">
              <a href="">
                <Image
                  width={26}
                  height={26}
                  src={articleData?.author.image!}
                  alt="lala"
                />
              </a>
              <div className="info">
                <a href="" className="author">
                  {articleData?.author.username}
                </a>
                <span className="date">
                  {/*  //Watch without toString()*/}
                  {articleData?.updatedAt.toString()}
                </span>
              </div>

              <ToggleButtonArticle props={articleData} />
            </div>
          </div>
        </div>

        <div className="container page">
          <div className="row article-content">
            <div className="col-md-12">
              <p>{articleData?.body}</p>
            </div>
          </div>
          <ul className="tag-list">
            {articleData?.tagList.map((tag, index) => {
              return (
                <li
                  className="tag-default tag-pill tag-outline ng-binding ng-scope"
                  key={index}
                >
                  {tag}
                </li>
              );
            })}
          </ul>

          <hr />

          <div className="article-actions">
            <div className="article-meta">
              <a href="profile.html">
                <Image
                  width={32}
                  height={32}
                  alt="lala"
                  src={articleData?.author.image!}
                />
              </a>
              <div className="info">
                <a href="" className="author">
                  {articleData?.author.username}
                </a>
                <span className="date">
                  {" "}
                  {articleData?.updatedAt.toString()}
                </span>
              </div>
              <ToggleButtonArticle props={articleData} />
            </div>
          </div>

          <div className="row">
            <div className="col-xs-12 col-md-8 offset-md-2">
              <form className="card comment-form">
                <div className="card-block">
                  <textarea
                    className="form-control"
                    placeholder="Write a comment..."
                    rows={3}
                  ></textarea>
                </div>
                <div className="card-footer">
                  <Image
                    width={32}
                    height={32}
                    alt="lala"
                    src={user.image}
                    className="comment-author-img"
                  />
                  <button
                    onClick={CreateComment}
                    className="btn btn-sm btn-primary"
                  >
                    Post Comment
                  </button>
                </div>
              </form>

              {comments.map((comment: Comment, index: any) => {
                return (
                  <div key={index} className="card">
                    <div className="card-block">
                      <p className="card-text">{comment.body}</p>
                    </div>
                    <div className="card-footer">
                      <a href="" className="comment-author">
                        <Image
                          width={32}
                          height={32}
                          alt="lala"
                          src={comment.author.image}
                          className={comment.author.image}
                        />
                      </a>
                      &nbsp;
                      <a href="" className="comment-author">
                        {comment.author.username}
                      </a>
                      <span className="date-posted">
                        {comment.updatedAt.toString()}
                      </span>
                      {user?.username === comment.author.username && (
                        <span className="mod-options">
                          <i className="ion-edit"></i>
                          <i className="ion-trash-a"></i>
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ArticleApi;
