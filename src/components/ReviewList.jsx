import { useEffect, useState } from "react";
import * as api from "../api";
import ReviewCard from "./ReviewCard";
import { useSearchParams } from "react-router-dom";
import SortReviews from "./SortReviews";

export default function ReviewList() {
  const [reviewList, setReviewList] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryQuery = searchParams.get("category");
  const orderQuery = searchParams.get("order");
  const sortQuery = searchParams.get("sort_by");

  useEffect(() => {
    setIsLoading(true);
    api.getReviews(categoryQuery, orderQuery, sortQuery).then((reviews) => {
      setReviewList(reviews);
      setIsLoading(false);
    });
  }, [categoryQuery, orderQuery, sortQuery]);
  return isLoading ? (
    <p>Loading!</p>
  ) : (
    <main className="Content">
      <SortReviews
        setSearchParams={setSearchParams}
        setIsLoading={setIsLoading}
        searchParams={searchParams}
      />

      {categoryQuery ? (
        <h2>Showing {categoryQuery} Reviews</h2>
      ) : (
        <h2>Showing All Reviews</h2>
      )}
      {orderQuery || sortQuery ? (
        <h3>
          Sorted by {sortQuery} in {orderQuery} Order
        </h3>
      ) : (
        <h3>Sorted by Date Created in Descending Order</h3>
      )}
      <ul id="reviewList">
        {reviewList.map((review) => {
          return <ReviewCard key={review.review_id} {...review} />;
        })}
      </ul>
    </main>
  );
}
