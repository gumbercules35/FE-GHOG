import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <div className="Nav">
      <Link to="/reviews">
        <button type="button">Reviews</button>
      </Link>
    </div>
  );
}
