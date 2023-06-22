import ArticleNavigation from "./components/ArticleNavigation";
import Articles from "./components/articles/Articles";
import FeedNav from "./components/feedToggle/FeedNav";
import Navigation from "./components/Navigation";
import PopularTags from "./components/popularTags/PopularTags";
//TODO: key index for id in maps
//TODO: page just in not sign in mode
//TODO: navigation optional
export default async function Home() {
  return (
    <>
      <Navigation />
      <div className="home-page">
        <div className="banner">
          <div className="container">
            <h1 className="logo-font">conduit</h1>
            <p>A place to share your knowledge.</p>
          </div>
        </div>

        <div className="container page">
          <div className="row">
            <div className="col-md-9">
              <FeedNav />
              {/* @ts-expect-error Server Component */}
              <Articles />
              {/* @ts-expect-error Server Component */}
              <ArticleNavigation />
            </div>
            {/* @ts-expect-error Server Component */}
            <PopularTags />
          </div>
        </div>
      </div>
    </>
  );
}
