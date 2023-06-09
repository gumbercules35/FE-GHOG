import axios from "axios";
const hogAPI = axios.create({
  baseURL: "https://gumbercules-hog-api.onrender.com/api",
});
export const getReviews = (category, order, sort_by, page, limit) => {
  return hogAPI
    .get("/reviews", {
      params: {
        category: category,
        sort_by: sort_by,
        order: order,
        p: page,
        limit: limit,
      },
    })
    .then(({ data }) => {
      return data;
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

export const getCategories = () => {
  return hogAPI.get("/categories").then(({ data }) => {
    return data.categories;
  });
};

export const getUsers = () => {
  return hogAPI.get("/users").then(({ data }) => {
    return data.users;
  });
};

export const getUserByUsername = (username) => {
  return hogAPI.get(`/users/${username}`).then(({ data }) => {
    return data.user;
  });
};

export const postReview = (postObj) => {
  return hogAPI.post("/reviews", postObj).then(({ data }) => {
    return data.review;
  });
};
