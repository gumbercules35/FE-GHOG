import axios from "axios";
const hogAPI = axios.create({
  baseURL: "https://gumbercules-hog-api.onrender.com/api",
});
export const getReviews = () => {
  return hogAPI.get("/reviews").then(({ data }) => {
    return data.reviews;
  });
};

export const getReviewById = (review_id) => {
  return hogAPI.get(`/reviews/${review_id}`).then(({ data }) => {
    return data.review;
  });
};

export const getComments = (review_id) => {
  return hogAPI.get(`/reviews/${review_id}/comments`).then(({ data }) => {
    return data.comments;
  });
};

export const patchReviewVotes = (review_id, increment) => {
  return hogAPI.patch(`/reviews/${review_id}`, { inc_votes: increment });
};

export const postComment = (review_id, postObj) => {
  return hogAPI
    .post(`/reviews/${review_id}/comments`, postObj)
    .then(({ data }) => {
      return data.comment;
    });
};

export const deleteComment = (comment_id) => {
  return hogAPI.delete(`/comments/${comment_id}`);
};
