import React, { useState } from "react";
import useSWR from "swr";

const ArticleNavigation = () => {
  const [activePage, setActivePage] = useState<number>(1);
  const PAGE_LIMIT = 10;
  const offset = (activePage - 1) * PAGE_LIMIT;

  const fetcher = (...args: Parameters<typeof fetch>) =>
    fetch(...args).then((res) => res.json());

  const { data, error, isValidating } = useSWR(
    `https://api.realworld.io/api/articles?limit=${PAGE_LIMIT}&offset=${offset}`,
    fetcher
  );

  if (error) return <div>Failed to load</div>;
  if (!data || isValidating) return <div>Loading...</div>;

  const totalApiPages = data.articlesCount;
  const totalPagination = Math.ceil(totalApiPages / PAGE_LIMIT);
  const handlePageClick = (pageNumber: number) => {
    setActivePage(pageNumber);
    console.log(pageNumber);
  };

  return (
    <div className="ng-isolate-scope">
      <nav>
        <ul className="pagination">
          {Array.from({ length: totalPagination }, (_, i) => i + 1).map(
            (pageNumber, index) => (
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
            )
          )}
        </ul>
      </nav>
    </div>
  );
};

export default ArticleNavigation;
