import axios from "axios";
const hogAPI = axios.create({
  baseURL: "https://gumbercules-hog-api.onrender.com/api",
});
export const getReviews = () => {
  return hogAPI.get("/reviews").then(({ data }) => {
    return data.reviews;
  });
};
