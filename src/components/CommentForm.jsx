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

  const handleSubmit = (e) => {
    e.preventDefault();
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
      })
      .catch((err) => {
        setActiveComments((currComments) => {
          const commentClone = [...currComments];
          return commentClone.splice(1);
        });
      });
  };
  return (
    <section className="FormContainer">
      <form onSubmit={handleSubmit}>
        <label htmlFor="commentInput">Comment:</label>
        <textarea
          name="comment Input"
          id="commentInput"
          value={userInput}
          onChange={(event) => {
            setUserInput(event.target.value);
          }}
          maxLength={75}
        ></textarea>
        <button type="submit">Post!</button>
      </form>
    </section>
  );
}
