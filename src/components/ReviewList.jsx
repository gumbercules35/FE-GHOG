import { useEffect, useState } from "react";
import * as api from "../api";
import ReviewCard from "./ReviewCard";

export default function ReviewList({ isLoading, setIsLoading, searchParams }) {
  const [reviewList, setReviewList] = useState(null);
  const [occuredError, setOccuredError] = useState(false);

  const categoryQuery = searchParams.get("category");
  const orderQuery = searchParams.get("order");
  const sortQuery = searchParams.get("sort_by");

  useEffect(() => {
    setOccuredError(false);
    setIsLoading(true);
    api
      .getReviews(categoryQuery, orderQuery, sortQuery)
      .then((reviews) => {
        setReviewList(reviews);
        setIsLoading(false);
      })
      .catch((err) => {
        setOccuredError(true);
        setIsLoading(false);
      });
  }, [categoryQuery, orderQuery, sortQuery]);
  return occuredError ? (
    <h2>Ooops, Invalid Query! Please try again</h2>
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
