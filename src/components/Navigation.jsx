import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <nav className="Nav">
      <Link to="/reviews">
        <button type="button">Reviews</button>
      </Link>
      <Link to="/categories">
        <button type="button">Categories</button>
      </Link>
      <Link to="/users">
        <button type="button">Users</button>
      </Link>
    </nav>
  );
}
