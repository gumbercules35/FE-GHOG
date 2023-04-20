import Paginate from "./Paginate";

import ReviewList from "./ReviewList";
import SortReviews from "./SortReviews";
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
export default function ReviewsView() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [limit, setLimit] = useState(12);
  return (
    <section className="Content">
      <SortReviews
        setSearchParams={setSearchParams}
        setIsLoading={setIsLoading}
        searchParams={searchParams}
        setPage={setPage}
        setLimit={setLimit}
      />
      <Link to="/reviews/post">
        <button type="button">Post A Review?</button>
      </Link>
      <ReviewList
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        searchParams={searchParams}
        page={page}
        totalCount={totalCount}
        setTotalCount={setTotalCount}
        limit={limit}
      />
      <Paginate
        page={page}
        setPage={setPage}
        totalCount={totalCount}
        limit={limit}
      />
    </section>
  );
}
