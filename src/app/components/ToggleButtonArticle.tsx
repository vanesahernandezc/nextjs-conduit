"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function ToggleButtonArticle(props: any) {
  const [isUser, setisUser] = useState(true);
  const router = useRouter();
  const articleData = props;
  console.log(articleData.props.slug);

  async function deleteArticle(articleData: any) {
    const item = localStorage.getItem("userLogged");
    if (!item) {
      return;
    }
    const user = JSON.parse(item);

    try {
      const response = await fetch(
        `https://api.realworld.io/api/articles/${articleData?.props?.slug}`,
        {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${user.token}`,
            "content-type": "application/json",
          },
        }
      );
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      {isUser ? (
        <>
          <Link
            href={`/editor/${articleData?.props?.slug}`}
            className="btn btn-outline-secondary btn-sm"
          >
            <i className="ion-edit"></i> Edit Article
          </Link>
          &nbsp;
          <button
            className="btn btn-outline-danger btn-sm"
            ng-class="{disabled: $ctrl.isDeleting}"
            onClick={() => deleteArticle(articleData)}
          >
            <i className="ion-trash-a"></i> Delete Article
          </button>
        </>
      ) : (
        <>
          <button className="btn btn-sm btn-outline-secondary">
            <i className="ion-plus-round"></i>
            &nbsp; Unfollow {articleData?.author?.username}{" "}
            <span className="counter">(10)</span>
          </button>
          &nbsp;&nbsp;
          <button className="btn btn-sm btn-outline-primary">
            <i className="ion-heart"></i>
            &nbsp; Favorite Post{" "}
            <span className="counter">({articleData?.favoritesCount})</span>
          </button>
        </>
      )}
    </>
  );
}

export default ToggleButtonArticle;
