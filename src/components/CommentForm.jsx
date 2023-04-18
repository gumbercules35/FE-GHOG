import { useState } from "react";
import * as api from "../api";
export default function CommentForm({
  username,
  IsLoading,
  setIsLoading,
  setActiveComments,
  review_id,
}) {
  const [userInput, setUserInput] = useState("");
  const [occurredError, setOccurredError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setOccurredError(false);
    const postObj = {
      username: username,
      body: userInput,
    };
    setIsLoading(true);
    api
      .postComment(review_id, postObj)
      .then((comment) => {
        setActiveComments((currComments) => {
          return [comment, ...currComments];
        });
        setIsLoading(false);
        setUserInput("");
      })
      .catch((err) => {
        setOccurredError(true);
        setActiveComments((currComments) => {
          const commentClone = [...currComments];
          return commentClone.splice(1);
        });
      });
  };
  return occurredError ? (
    <p>oops! Something went wrong</p>
  ) : (
    <section className="FormContainer">
      <form onSubmit={handleSubmit}>
        <section>
          <label htmlFor="commentInput">Comment:</label>
        </section>
        <textarea
          name="comment Input"
          id="commentInput"
          value={userInput}
          onChange={(event) => {
            setUserInput(event.target.value);
          }}
          maxLength={75}
        ></textarea>
        <section>
          <button type="submit" disabled={IsLoading}>
            Post!
          </button>
        </section>
      </form>
    </section>
  );
}
