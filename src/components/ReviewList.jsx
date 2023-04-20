import { useEffect, useState } from "react";
import * as api from "../api";
import ReviewCard from "./ReviewCard";
import Error from "./Error";

export default function ReviewList({
  isLoading,
  setIsLoading,
  searchParams,
  page,
  setPage,
  totalCount,
  setTotalCount,
}) {
  const [reviewList, setReviewList] = useState([]);
  const [occuredError, setOccuredError] = useState(false);
  const [errorCode, setErrorCode] = useState(0);

  const categoryQuery = searchParams.get("category");
  const orderQuery = searchParams.get("order");
  const sortQuery = searchParams.get("sort_by");

  useEffect(() => {
    setOccuredError(false);
    setIsLoading(true);
    api
      .getReviews(categoryQuery, orderQuery, sortQuery, page)
      .then(({ reviews, total_count }) => {
        setReviewList(reviews);
        setTotalCount(total_count);
        setIsLoading(false);
      })
      .catch(
        ({
          response: {
            request: { status },
          },
        }) => {
          setErrorCode(status);
          setOccuredError(true);
          setIsLoading(false);
          setTotalCount(0);
        }
      );
  }, [categoryQuery, orderQuery, sortQuery, page]);
  return occuredError ? (
    <Error errCode={errorCode} />
  ) : isLoading ? (
    <p>Loading!</p>
  ) : (
    <main className="Content">
      {categoryQuery ? (
        <h2>Showing {categoryQuery} Reviews</h2>
      ) : (
        <h2>Showing All Reviews</h2>
      )}

      <ul id="reviewList">
        {reviewList.map((review) => {
          return <ReviewCard key={review.review_id} {...review} />;
        })}
      </ul>
    </main>
  );
}
