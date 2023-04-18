export default function UserPlaque({ username, avatar_url }) {
  return (
    <section className="UserPlaqueContainer">
      <img id="UserPlaqueImg" src={avatar_url} alt="User Avatar" />
      <p id="UserPlaqueName">{username}</p>
    </section>
  );
}
