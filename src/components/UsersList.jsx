import { useEffect, useState } from "react";
import * as api from "../api";
import UserCard from "./UserCard";

export default function UsersList({ activeUser, setActiveUser }) {
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    api
      .getUsers()
      .then((users) => {
        setUserList(users);
      })
      .then(() => {
        setIsLoading(false);
      });
  }, []);
  return isLoading ? (
    <h2>Loading Users Please Wait</h2>
  ) : (
    <main className="Content">
      <h2>UserList</h2>
      <ul id="userList">
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
