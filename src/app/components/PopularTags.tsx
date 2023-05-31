import getTags from "@/services/getTags";
import { useEffect, useState } from "react";

export function PopularTags() {
  //TODO: type JSX
  const [htmlTags, setHtmlTags] = useState<JSX.Element | JSX.Element[]>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    // (async () => {
    //   const tags = await getTags();
    //   const tagsHtmlApi = toHtmlTag(tags);
    //   setHtmlTags(tagsHtmlApi);
    // })();

    async function fetchTags() {
      try {
        const tags = await getTags();
        const tagsHtmlApi = toHtmlTag(tags);
        setHtmlTags(tagsHtmlApi);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchTags();
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
        <div className="tag-list">
          {loading ? <p>Loading tags...</p> : htmlTags}
        </div>
      </div>
    </div>
  );
}
