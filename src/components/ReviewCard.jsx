import { Link } from "react-router-dom";
export default function ReviewCard({
  owner,
  title,
  category,
  review_img_url,
  votes,
  comment_count,
  review_id,
}) {
  return (
    <div className="ReviewCard">
      <Link to={`/reviews/${review_id}`}>
        <h3>{title}</h3>
        <img src={review_img_url} alt={`Review ${review_id} Decoration`} />
      </Link>

      <ul>
        <li>Category: {category}</li>
        <li>Author: {owner}</li>
        <li>{comment_count} Comments</li>
      </ul>
    </div>
  );
}
