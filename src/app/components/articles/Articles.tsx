import Image from "next/image";
import { IArticle } from "../../interfaces/IArticle";
type Response = {
  articles: IArticle[];
};
//TODO: console data show loop
const getArticles = async () => {
  const response = await fetch(
    "https://api.realworld.io/api/articles?limit=10&offset=0"
  );
  const data: Response = await response.json();
  console.log(data);
  return data.articles;
};
export default async function Articles() {
  const articles = await getArticles();

  //TODO: click on tags per article
  return (
    <>
      {articles.map((article, index) => {
        return (
          <div key={index} className="article-preview">
            <div className="article-meta">
              <a href="profile.html">
                <Image
                  width={32}
                  height={32}
                  alt="profile-picture"
                  src={article.author.image}
                  // "https://i.imgur.com/Qr71crq.jpg"
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
            <a href={`/article/${article.slug}`} className="preview-link">
              {<h1>{article.title}</h1>}
              <p>{article.description}</p>
              <span>Read more...</span>
            </a>
          </div>
        );
      })}
    </>
  );
}
