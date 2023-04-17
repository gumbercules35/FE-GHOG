import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="Header">
      {" "}
      <Link to="/">
        <h1>House Of Games!</h1>
      </Link>{" "}
    </div>
  );
}
