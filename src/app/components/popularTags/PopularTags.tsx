import { ITag } from "../../interfaces/ITag";

type Response = {
  tags: ITag[];
};

const getTags = async () => {
  const response = await fetch("https://api.realworld.io/api/tags");
  const data: Response = await response.json();
  return data.tags;
};
//TODO: loading component

export default async function PopularTags() {
  const popularTags = await getTags();

  return (
    <>
      <div className="col-md-3">
        <div className="sidebar">
          <p>Popular Tags</p>

          <div className="tag-list">
            {popularTags.map((tag, index) => {
              return (
                <a key={index} href="" className="tag-pill tag-default">
                  {tag}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
