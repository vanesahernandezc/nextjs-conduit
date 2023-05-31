"use client";
import { useState } from "react";

export async function FetchTags() {
  const [tags, setTags] = useState(null);
  try {
    const api = await fetch("https://api.realworld.io/api/tags");
    const data = await api.json();
    return data;
  } catch (error) {
    console.error(error);
  }

  // function toHtml(tags:any){
  //   if (!tags || tags.length === 0) {
  //     return <p className="article-preview">No tags are here... yet.</p>;
  //   }
  //   return tags.map((tag: any, index: number) => (
  //     <div key={index} className="tag-default tag-pill ng-binding ng-scopet">
  //       {tag}
  //     </div>
  //   ));
  // }

  //   return(
  // <div></div>
  //     )
}
