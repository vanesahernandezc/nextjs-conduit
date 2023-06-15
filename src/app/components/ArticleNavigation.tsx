"use client";
import { useState } from "react";
import useSWR from "swr";
//TODO: rendering 2 times
const ArticleNavigation = () => {
  const [activePage, setActivePage] = useState<number>(1);
  //   const fetcher = (arg: any, ...args: any) => fetch(arg, ...args);
  type FetcherArgs = [RequestInfo, RequestInit?];
  const fetcher = (...args: FetcherArgs) =>
    fetch(...args).then((res) => res.json());

  const PAGE_LIMIT = 10;
  const offset = (activePage - 1) * PAGE_LIMIT;

  const { data, error, isLoading } = useSWR(
    `https://api.realworld.io/api/articles?limit=${PAGE_LIMIT}&offset=${offset}`,
    fetcher
  );

  // const { data, error, isLoading } = useSWR(
  //   "https://api.realworld.io/api/articles?limit=10&offset=0",
  //   fetcher
  // );
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  //here and fetch
  const totalApiPages = data.articlesCount;
  const totalPagination = Math.ceil(totalApiPages / PAGE_LIMIT);
  const handlePageClick = (pageNumber: number) => {
    setActivePage(pageNumber);
  };
  if (data) {
    return (
      <>
        <div className="ng-isolate-scope">
          <nav>
            <ul className="pagination">
              {Array.from({ length: totalPagination }, (_, i) => i + 1).map(
                (pageNumber, index) => {
                  return (
                    <li
                      key={index}
                      className={
                        pageNumber === activePage
                          ? "page-item ng-scope active"
                          : "page-item ng-scope"
                      }
                    >
                      <button
                        className="page-link ng binding"
                        onClick={() => handlePageClick(pageNumber)}
                      >
                        {pageNumber}
                      </button>
                    </li>
                  );
                }
              )}
            </ul>
          </nav>
        </div>
      </>
    );
  }
};
export default ArticleNavigation;
