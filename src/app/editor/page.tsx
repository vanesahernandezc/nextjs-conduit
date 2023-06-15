"use client";
import React, { useState } from "react";
import Navigation from "../components/Navigation";

const createArticle = async (
  title: string,
  description: string,
  body: string,
  taglist: string[]
) => {
  try {
    const token = localStorage.getItem("userLogged");
    if (!token) {
      return;
    }
    const tokencito = JSON.parse(token);
    const result = await fetch("https://api.realworld.io/api/articles", {
      method: "POST",
      headers: {
        authorization: `Bearer ${tokencito}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        article: {
          title,
          description,
          body,
          taglist,
        },
      }),
    });
    return await result.json();
  } catch (error) {
    console.error(error);
  }
};

export default function Editor() {
  const [{ title, description, body, taglist }, setFormData] = useState({
    title: "",
    description: "",
    body: "",
    taglist: [],
  });
  const handleArticle = async (e: any) => {
    e.preventDefault();
    await createArticle(title, description, body, taglist);
  };

  const onChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((form) => ({
      ...form,
      [name]: value,
    }));
  };

  console.log(title, description, body, taglist);

  return (
    <>
      <Navigation />
      <div className="editor-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-10 offset-md-1 col-xs-12">
              <form>
                <fieldset>
                  <fieldset className="form-group">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Article Title"
                      value={title}
                      name="title"
                      onChange={onChange}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="What's this article about?"
                      value={description}
                      name="description"
                      onChange={onChange}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <textarea
                      className="form-control"
                      rows={8}
                      placeholder="Write your article (in markdown)"
                      value={body}
                      name="body"
                      onChange={onChange}
                    ></textarea>
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter tags"
                      value={taglist}
                      name="taglist"
                      onChange={onChange}
                    />
                    <div className="tag-list"></div>
                  </fieldset>
                  <button
                    onClick={handleArticle}
                    className="btn btn-lg pull-xs-right btn-primary"
                    type="button"
                  >
                    Publish Article
                  </button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
