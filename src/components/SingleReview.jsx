import { useParams } from "react-router-dom";
import * as api from "../api";
import { useEffect, useState } from "react";
import CommentList from "./CommentList";
import Error from "./Error";

export default function SingleReview({ username }) {
  const { review_id } = useParams();
  const [activeReview, setActiveReview] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [occurredError, setOccurredError] = useState(false);
  const [activeVotes, setActiveVotes] = useState(null);
  const [hasVoted, setHasVoted] = useState({
    up: false,
    neutral: true,
    down: false,
  });
  const [errorCode, setErrorCode] = useState(0);

  const [voteValues, setVoteValues] = useState({
    up: 1,
    neutral: 0,
    down: -1,
  });

  const voteHandler = (increment) => {
    if (increment !== 0) {
      setActiveVotes((currentVotes) => {
        return currentVotes + increment;
      });
      api.patchReviewVotes(review_id, increment).catch(() => {
        setActiveVotes((currentVotes) => {
          return currentVotes - increment;
        });
      });
    } else {
      if (hasVoted.up) {
        voteHandler(1);
      } else if (hasVoted.down) {
        voteHandler(-1);
      }
    }
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
      .catch(
        ({
          response: {
            request: { status },
          },
        }) => {
          setErrorCode(status);
          setOccurredError(true);
          setHasVoted({ up: false, down: false });
        }
      );
  }, [review_id]);
  return occurredError ? (
    <Error errCode={errorCode} />
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

      <div className="tw-toggle">
        <input
          type="radio"
          name="toggle"
          value={voteValues.down}
          onChange={() => {
            setHasVoted({ up: true, neutral: false, down: false });
            voteHandler(voteValues.down);
          }}
        />
        <label className="toggle toggle-yes">
          <i className="fa fa-arrow-down"></i>
        </label>
        <input
          defaultChecked
          type="radio"
          name="toggle"
          value={voteValues.neutral}
          onChange={() => {
            setHasVoted((currentVoteState) => {
              return {
                up: currentVoteState.up,
                neutral: true,
                down: currentVoteState.down,
              };
            });
            voteHandler(voteValues.neutral);
          }}
        />
        <label className="toggle toggle-yes">
          <i className="fa fa-minus"></i>
        </label>
        <input
          type="radio"
          name="toggle"
          value={voteValues.up}
          onChange={() => {
            setHasVoted({ up: false, neutral: false, down: true });
            voteHandler(voteValues.up);
          }}
        />
        <label className="toggle toggle-yes">
          <i className="fa fa-arrow-up"></i>
        </label>
        <span></span>
        <p>Votes:{activeVotes}</p>
      </div>

      <CommentList review_id={activeReview.review_id} username={username} />
    </main>
  );
}
