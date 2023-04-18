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
    setActiveComments((currComments) => {
      const clone = [...currComments];
      return clone.filter((comment) => {
        return comment.comment_id !== comment_id;
      });
    });
    api.deleteComment(comment_id).catch((err) => {
      setOccurredError(true);
      setIsDisabled(false);
    });
  };
  return (
    <section className="CommentCard">
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
      <section id="CommentBody">
        <p>{body}</p>
      </section>
      <section id="CommentFooter">
        <p>Votes: {votes}</p>
        {author === activeUsername && !deleteCheck ? (
          <button
            type="button"
            onClick={() => {
              setDeleteCheck(true);
            }}
            disabled={isDisabled}
          >
            Delete
          </button>
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
