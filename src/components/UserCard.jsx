import { Link } from "react-router-dom";
export default function UserCard({ user, activeUser, setActiveUser }) {
  return (
    <section className="UserPlaqueContainer">
      <Link to={`/users/${user.username}`}>
        <img
          src={user.avatar_url}
          alt={`user ${user.username} avatar`}
          id="UserListImg"
        />
        <h3>{user.username}</h3>
      </Link>
      {user.username === activeUser?.username ? (
        <button
          type="button"
          onClick={() => {
            setActiveUser(null);
          }}
        >
          Stop Mimicking?
        </button>
      ) : (
        <button
          type="button"
          onClick={() => {
            setActiveUser(user);
          }}
        >
          Mimic {user.username}?
        </button>
      )}
    </section>
  );
}
