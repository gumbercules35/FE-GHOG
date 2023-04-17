import { useParams } from "react-router-dom";
import * as api from "../api";
import { useEffect, useState } from "react";

export default function SingleReview() {
  const params = useParams();
  const [activeReview, setActiveReview] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [occurredError, setOccurredError] = useState(false);

  useEffect(() => {
    setOccurredError(false);
    setIsLoading(true);
    api
      .getReviewById(params.review_id)
      .then((review) => {
        setActiveReview(review);
        setIsLoading(false);
      })
      .catch((err) => {
        setOccurredError(true);
      });
  }, [params]);
  return occurredError ? (
    <p>oops! Something Went Wrong</p>
  ) : isLoading ? (
    <p>Loading!</p>
  ) : (
    <div className="SingleReview">
      <h2>{activeReview.title}</h2>
      <ul className="SingleReviewList">
        <li>Category: {activeReview.category}</li>
        <li>Created on: {activeReview.created_at}</li>
      </ul>

      <img src={activeReview.review_img_url} alt="reviewimg" />
      <h3>A review by: {activeReview.owner}</h3>

      <p>{activeReview.review_body}</p>
    </div>
  );
}
