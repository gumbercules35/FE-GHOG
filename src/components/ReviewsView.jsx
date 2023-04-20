import Paginate from "./Paginate";
import ReviewList from "./ReviewList";
import SortReviews from "./SortReviews";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
export default function ReviewsView() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  return (
    <section className="Content">
      <SortReviews
        setSearchParams={setSearchParams}
        setIsLoading={setIsLoading}
        searchParams={searchParams}
        setPage={setPage}
      />
      <ReviewList
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        searchParams={searchParams}
        page={page}
        setPage={setPage}
        totalCount={totalCount}
        setTotalCount={setTotalCount}
      />
      <Paginate page={page} setPage={setPage} totalCount={totalCount} />
    </section>
  );
}
