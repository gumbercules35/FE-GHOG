import { useEffect, useState } from "react";
import * as api from "../api";
import ReviewCard from "./ReviewCard";
import { Link } from "react-router-dom";
export default function ReviewForm({ username }) {
  const [isLoading, setIsLoading] = useState(true);
  const [occurredError, setOccurredError] = useState(false);
  const [activeCategories, setActiveCategories] = useState([]);
  const [inputTitle, setInputTitle] = useState("");
  const [selectCategory, setSelectCategory] = useState("strategy");
  const [inputDesigner, setInputDesigner] = useState("");
  const [inputReviewBody, setInputReviewBody] = useState("");
  const [inputImgUrl, setInputImgUrl] = useState("");
  const [postedReview, setPostedReview] = useState(null);

  useEffect(() => {
    setOccurredError(false);
    setIsLoading(true);
    api
      .getCategories()
      .then((categories) => {
        setActiveCategories(() => {
          return categories.map((category) => {
            return { slug: category.slug };
          });
        });
      })
      .then(() => {
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setOccurredError(true);
      });
  }, []);
  const submitReview = (event) => {
    event.preventDefault();
    const postObj = {
      title: inputTitle,
      category: selectCategory,
      designer: inputDesigner,
      owner: username,
      review_body: inputReviewBody,
      review_img_url:
        inputImgUrl ||
        "https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?w=700&h=700",
    };
    setIsLoading(true);
    api
      .postReview(postObj)
      .then((review) => {
        setPostedReview(review);
        setInputTitle("");
        setSelectCategory("strategy");
        setInputDesigner("");
        setInputImgUrl("");
        setInputReviewBody("");
      })
      .then(() => {
        setIsLoading(false);
      });
  };
  return (
    <main>
      {occurredError ? (
        <h2>Oops! Something Went Wrong</h2>
      ) : isLoading ? (
        <h2>Loading Please Wait!</h2>
      ) : postedReview ? (
        <section>
          <h2>Review Posted!</h2>
          <ReviewCard {...postedReview} />
          <button
            type="button"
            onClick={() => {
              setPostedReview(null);
            }}
          >
            Post Another Review?
          </button>
        </section>
      ) : (
        <form onSubmit={submitReview} className="ReviewFormContainer">
          <label htmlFor="review_title">Title:</label>
          <input
            type="text"
            name="title"
            id="review_title"
            required
            value={inputTitle}
            onChange={(e) => {
              setInputTitle(e.target.value);
            }}
          />
          <label htmlFor="category">Category:</label>
          <select
            required
            name="category"
            id="category"
            value={selectCategory}
            onChange={(e) => {
              setSelectCategory(e.target.value);
            }}
          >
            {activeCategories.map((category) => {
              return (
                <option key={category.slug} value={category.slug}>
                  {category.slug}
                </option>
              );
            })}
          </select>
          <label htmlFor="designer">Game Designer:</label>
          <input
            type="text"
            name="designer"
            id="designer"
            value={inputDesigner}
            onChange={(e) => {
              setInputDesigner(e.target.value);
            }}
          />
          <label htmlFor="body">Write your review here:</label>
          <textarea
            required
            name="body"
            id="body"
            cols="40"
            rows="5"
            value={inputReviewBody}
            onChange={(e) => {
              setInputReviewBody(e.target.value);
            }}
          ></textarea>
          <label htmlFor="img_url">Image Url:</label>
          <input
            type="url"
            name="img_url"
            id="img_url"
            value={inputImgUrl}
            placeholder="https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?w=700&h=700"
            onChange={(e) => {
              setInputImgUrl(e.target.value);
            }}
          />
          <button type="submit">Submit Review</button>
        </form>
      )}
    </main>
  );
}
