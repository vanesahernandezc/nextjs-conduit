"use client";
import Articles from "./components/articles/Articles";
import Navigation from "./components/Navigation";
import PopularTagss from "./components/popularTags/PopularTags";
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
              <div className="feed-toggle">
                <ul className="nav nav-pills outline-active">
                  {/* <li className="nav-item">
                    <a className="nav-link disabled" href="">
                      Your Feed
                    </a>
                  </li> */}
                  <li className="nav-item">
                    <a className="nav-link active" href="">
                      Global Feed
                    </a>
                  </li>
                </ul>
              </div>
              {/* @ts-expect-error Server Component */}

              <Articles />
            </div>
            {/* @ts-expect-error Server Component */}
            <PopularTagss />
          </div>
        </div>
      </div>
    </>
  );
}
