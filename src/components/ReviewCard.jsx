export default function ReviewCard({
  owner,
  title,
  category,
  review_img_url,
  votes,
  comment_count,
}) {
  return (
    <div className="ReviewCard">
      <h3>{title}</h3>
      <img src={review_img_url} alt="reviewimg" />
      <ul>
        <li>Category: {category}</li>
        <li>Author: {owner}</li>
        <li>{comment_count} Comments</li>
      </ul>
    </div>
  );
}
