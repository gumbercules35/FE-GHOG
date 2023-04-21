import { Link, useParams } from "react-router-dom";
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
        voteHandler(-1);
        setHasVoted({ up: false, neutral: true, down: false });
      } else if (hasVoted.down) {
        voteHandler(1);
        setHasVoted({ up: false, neutral: true, down: false });
      }
    }
  };

  useEffect(() => {
    setOccurredError(false);
    setIsLoading(true);
    api
      .getReviewById(review_id)
      .then(({ created_at, ...restOfReview }) => {
        setActiveReview(() => {
          const date = new Date(created_at).toDateString();
          return { created_at: date, ...restOfReview };
        });
        setActiveVotes(restOfReview.votes);
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
      <h3>
        A review by:{" "}
        <Link to={`/users/${activeReview.owner}`}>{activeReview.owner}</Link>
      </h3>

      <p id="ReviewBody">{activeReview.review_body}</p>

      <section className="VoteRadio">
        <label className={`toggle${hasVoted.down ? "activeDown" : ""}`}>
          Down Vote
        </label>
        <input
          type="radio"
          name="toggle"
          value={voteValues.down}
          onChange={() => {
            setHasVoted({ up: false, neutral: false, down: true });
            voteHandler(voteValues.down);
          }}
        />
        <label className={`toggle${hasVoted.neutral ? "activeNeut" : ""}`}>
          Neutral
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
        <label className={`toggle${hasVoted.up ? "activeUp" : ""}`}>
          UpVote
        </label>
        <input
          type="radio"
          name="toggle"
          value={voteValues.up}
          onChange={() => {
            setHasVoted({ up: true, neutral: false, down: false });
            voteHandler(voteValues.up);
          }}
        />

        <span></span>
        <p>Votes:{activeVotes}</p>
      </section>

      <CommentList review_id={activeReview.review_id} username={username} />
    </main>
  );
}
