import { useState } from "react";
import * as api from "../api";

export default function CommentCard({
  author,
  body,
  created_at,
  votes,
  activeUsername,
  setActiveComments,
  comment_id,
}) {
  const date = new Date(created_at).toDateString();
  const [deleteCheck, setDeleteCheck] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [occurredError, setOccurredError] = useState(false);

  const handleDelete = () => {
    setIsDisabled(true);
    setOccurredError(false);

    api
      .deleteComment(comment_id)
      .then(() => {
        setActiveComments((currComments) => {
          const clone = [...currComments];
          return clone.filter((comment) => {
            return comment.comment_id !== comment_id;
          });
        });
      })
      .catch((err) => {
        setOccurredError(true);
        setIsDisabled(false);
        setDeleteCheck(false);
      });
  };
  return (
    <section className={occurredError ? "ErroredComponent" : "CommentCard"}>
      <section id="CommentHeader">
        <h4>
          Username: <br />
          {author}
        </h4>
        <p>
          Comment Left:
          <br />
          {date}
        </p>
      </section>
      {isDisabled ? (
        <h5>Deleting Comment</h5>
      ) : (
        <section id="CommentBody">
          <p>{body}</p>
        </section>
      )}
      <section id="CommentFooter">
        <p>Votes: {votes}</p>
        {author === activeUsername && !deleteCheck ? (
          <section>
            {occurredError ? (
              <p>Something went wrong, please try again!</p>
            ) : null}
            <button
              type="button"
              onClick={() => {
                setDeleteCheck(true);
              }}
              disabled={isDisabled}
            >
              Delete
            </button>
          </section>
        ) : null}
        {deleteCheck ? (
          <section>
            <button type="button" onClick={handleDelete} disabled={isDisabled}>
              Yes
            </button>
            <button
              type="button"
              onClick={() => {
                setDeleteCheck(false);
              }}
              disabled={isDisabled}
            >
              No
            </button>
          </section>
        ) : null}
      </section>
    </section>
  );
}
