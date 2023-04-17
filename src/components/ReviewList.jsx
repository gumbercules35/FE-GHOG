import { useEffect, useState } from "react";
import * as api from "../api";
import ReviewCard from "./ReviewCard";

export default function ReviewList() {
  const [reviewList, setReviewList] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  console.log("🚀 ~ file: ReviewList.jsx:7 ~ reviewList:", reviewList);

  useEffect(() => {
    setIsLoading(true);
    api.getReviews().then((reviews) => {
      setReviewList(reviews);
      setIsLoading(false);
    });
  }, []);
  return isLoading ? (
    <p>Loading!</p>
  ) : (
    <div className="Content">
      <h2>Review List</h2>
      <ul id="reviewList">
        {reviewList.map((review) => {
          return <ReviewCard key={review.review_id} {...review} />;
        })}
      </ul>
    </div>
  );
}
