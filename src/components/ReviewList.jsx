import { useEffect, useState } from "react";
import * as api from "../api";
import ReviewCard from "./ReviewCard";
import { useSearchParams } from "react-router-dom";

export default function ReviewList() {
  const [reviewList, setReviewList] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryQuery = searchParams.get("category");

  useEffect(() => {
    setIsLoading(true);
    api.getReviews(categoryQuery).then((reviews) => {
      setReviewList(reviews);
      setIsLoading(false);
    });
  }, [categoryQuery]);
  return isLoading ? (
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
