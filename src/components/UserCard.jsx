export default function UserCard({ user, activeUser, setActiveUser }) {
  return (
    <section className="UserPlaqueContainer">
      <img src={user.avatar_url} alt="user avatar" id="UserListImg" />
      <h3>{user.username}</h3>
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
