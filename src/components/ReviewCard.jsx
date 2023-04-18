import { Link } from "react-router-dom";
export default function ReviewCard({
  owner,
  title,
  category,
  review_img_url,
  votes,
  comment_count,
  review_id,
  created_at,
  designer,
}) {
  const date = new Date(created_at).toLocaleDateString();

  return (
    <div className="ReviewCard">
      <Link to={`/reviews/${review_id}`}>
        <h3>{title}</h3>
        <img src={review_img_url} alt={`Review ${review_id} Decoration`} />
      </Link>

      <ul>
        <li>Designer: {designer}</li>
        <li>Category: {category}</li>
        <li>Author: {owner}</li>
        <li>
          {comment_count} Comments{" "}
          {votes === 1 ? `${votes} Vote` : `${votes} Votes`}
        </li>
      </ul>
      <p>Posted on: {date}</p>
    </div>
  );
}
