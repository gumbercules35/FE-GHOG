import { Link } from "react-router-dom";
import UserPlaque from "./UserPlaque";

export default function Header(user) {
  return (
    <header className="Header">
      <UserPlaque {...user} />
      <Link to="/" id="HeaderText">
        <h1>House Of Games!</h1>
      </Link>
    </header>
  );
}
