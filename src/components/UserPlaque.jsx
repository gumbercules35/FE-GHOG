export default function UserPlaque({ username, avatar_url, setActiveUser }) {
  return (
    <section className="UserPlaqueContainer">
      <img id="UserPlaqueImg" src={avatar_url} alt="User Avatar" />
      <p id="UserPlaqueName">{username}</p>
      <button
        type="button"
        onClick={() => {
          setActiveUser(null);
        }}
      >
        Sign Out?
      </button>
    </section>
  );
}
