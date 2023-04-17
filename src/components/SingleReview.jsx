import { useParams } from "react-router-dom";
import * as api from "../api";
import { useEffect, useState } from "react";
import CommentList from "./CommentList";

export default function SingleReview() {
  const { review_id } = useParams();
  const [activeReview, setActiveReview] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [occurredError, setOccurredError] = useState(false);
  const [activeVotes, setActiveVotes] = useState(null);

  const voteHandler = (increment) => {
    setActiveVotes((currentVotes) => {
      return currentVotes + increment;
    });
    api.patchReviewVotes(review_id, increment).catch(() => {
      setActiveVotes((currentVotes) => {
        return currentVotes - increment;
      });
    });
  };

  useEffect(() => {
    setOccurredError(false);
    setIsLoading(true);
    api
      .getReviewById(review_id)
      .then((review) => {
        setActiveReview(review);
        setActiveVotes(review.votes);
        setIsLoading(false);
      })
      .catch((err) => {
        setOccurredError(true);
      });
  }, [review_id]);
  return occurredError ? (
    <p>oops! Something Went Wrong</p>
  ) : isLoading ? (
    <p>Loading!</p>
  ) : (
    <main className="SingleReview">
      <h2>{activeReview.title}</h2>
      <ul className="SingleReviewList">
        <li>Category: {activeReview.category}</li>
        <li>Created on: {activeReview.created_at}</li>
      </ul>

      <img src={activeReview.review_img_url} alt="User Defined Decorative" />
      <h3>A review by: {activeReview.owner}</h3>

      <p id="ReviewBody">{activeReview.review_body}</p>
      <section id="VotingButtonBar">
        <button
          type="button"
          onClick={() => {
            voteHandler(1);
          }}
        >
          Love it!
        </button>
        <button
          type="button"
          onClick={() => {
            voteHandler(-1);
          }}
        >
          Boooo!
        </button>
        <p>Votes:{activeVotes}</p>
      </section>

      <CommentList review_id={activeReview.review_id} />
    </main>
  );
}
