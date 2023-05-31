import getTags from "@/services/getTags";
import { useEffect, useState } from "react";

export function PopularTags() {
  //TODO: type JSX
  const [htmlTags, setHtmlTags] = useState<JSX.Element | JSX.Element[]>();

  useEffect(() => {
    (async () => {
      const tags = await getTags();
      const tagsHtmlApi = toHtmlTag(tags);
      setHtmlTags(tagsHtmlApi);
    })();
  }, []);

  function toHtmlTag(tags: string[] | undefined) {
    if (!tags || tags.length === 0) {
      return <p className="article-preview">No tags are here... yet.</p>;
    }
    return tags.map((tag, index) => {
      return (
        <a key={index} href="" className="tag-pill tag-default">
          {tag}
        </a>
      );
    });
  }

  return (
    <div className="col-md-3">
      <div className="sidebar">
        <p>Popular Tags</p>

        <div className="tag-list">{htmlTags}</div>
      </div>
    </div>
  );
}

// function ListOfPopularTags() {
//   return <div className="lala">Hola</div>;
// }

// function noPopularTagsResult() {
//   return <div className="lolo">No found</div>;
// }

// export function PopularTags() {
//   return <div> hello</div>;
// }
