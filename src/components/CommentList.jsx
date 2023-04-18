import { useEffect, useState } from "react";
import * as api from "../api";
import CommentCard from "./CommentCard";
import CommentForm from "./CommentForm";

export default function CommentList({ review_id, username }) {
  const [activeComments, setActiveComments] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [occurredError, setOccurredError] = useState(false);

  useEffect(() => {
    setOccurredError(false);
    setIsLoading(true);
    api
      .getComments(review_id)
      .then((comments) => {
        setActiveComments(comments);
        setIsLoading(false);
      })
      .catch((error) => {
        setOccurredError(true);
      });
  }, [review_id]);

  return occurredError ? (
    <p>oops! Something Went Wrong</p>
  ) : isLoading ? (
    <p>Loading Comments!</p>
  ) : (
    <section className="CommentContainer">
      <CommentForm
        username={username}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        setActiveComments={setActiveComments}
        review_id={review_id}
      />
      <section className="CommentList">
        {activeComments.length > 0 ? (
          <h3>Showing {activeComments.length} Comments on this review</h3>
        ) : (
          <h3>This Review has no Comments yet, be the first to Post one!</h3>
        )}
        <ul>
          {activeComments.map((comment) => {
            return (
              <li key={comment.comment_id}>
                <CommentCard
                  {...comment}
                  activeUsername={username}
                  setActiveComments={setActiveComments}
                />
              </li>
            );
          })}
        </ul>
      </section>
    </section>
  );
}
