import { useEffect, useState } from "react";
import * as api from "../api";
import UserCard from "./UserCard";

export default function UsersList({ activeUser, setActiveUser }) {
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    api.getUsers().then((users) => {
      setUserList(users);
      setIsLoading(false);
    });
  }, []);
  return (
    <main className="Content">
      <h2>UserList</h2>
      <ul id="reviewList">
        {userList.map((user) => {
          return (
            <li
              key={user.username}
              className={
                user.username === activeUser?.username
                  ? "ActiveUser"
                  : "UserNormal"
              }
            >
              <UserCard
                user={user}
                activeUser={activeUser ? { ...activeUser } : null}
                setActiveUser={setActiveUser}
              />
            </li>
          );
        })}
      </ul>
    </main>
  );
}
