import { Link } from "react-router-dom";
import UserPlaque from "./UserPlaque";

export default function Header({ activeUser, setActiveUser }) {
  return (
    <header className="Header">
      {activeUser ? (
        <UserPlaque {...activeUser} setActiveUser={setActiveUser} />
      ) : (
        <Link to="/users">
          <p>Click Here To Pick a User</p>
        </Link>
      )}
      <Link to="/" id="HeaderText">
        <h1>House Of Games!</h1>
      </Link>
    </header>
  );
}
