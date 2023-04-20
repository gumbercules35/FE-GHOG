import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as api from "../api";
export default function UserProfile() {
  const [profile, setProfile] = useState(null);
  const { username } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    api
      .getUserByUsername(username)
      .then((user) => {
        setProfile(user);
      })
      .then(() => {
        setIsLoading(false);
      });
  }, [username]);

  return isLoading ? (
    <h2>Loading User</h2>
  ) : (
    <main>
      <h2>{profile.username}</h2>
      <img src={profile.avatar_url} alt={`${profile.username} avatar`} />
      <h3>Name: {profile.name}</h3>
    </main>
  );
}
