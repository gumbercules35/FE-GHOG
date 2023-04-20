import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Navigation from "./components/Navigation";

import SingleReview from "./components/SingleReview";

import { useState } from "react";
import CategoryList from "./components/CategoryList";
import Error from "./components/Error";
import ReviewsView from "./components/ReviewsView";
import UsersList from "./components/UsersList";
import UserProfile from "./components/UserProfile";

function App() {
  const [activeUser, setActiveUser] = useState(null);

  return (
    <div className="App">
      <Header
        activeUser={activeUser ? { ...activeUser } : null}
        setActiveUser={setActiveUser}
      />
      <Navigation />
      <Routes>
        <Route path="/" element={<ReviewsView />} />
        <Route path="/reviews" element={<ReviewsView />} />
        <Route
          path="/reviews/:review_id"
          element={<SingleReview username={activeUser?.username} />}
        />
        <Route path="/categories" element={<CategoryList />} />
        <Route
          path="/users"
          element={
            <UsersList activeUser={activeUser} setActiveUser={setActiveUser} />
          }
        />
        <Route path="/users/:username" element={<UserProfile />} />
        <Route path="*" element={<Error errCode={404} />} />
      </Routes>
    </div>
  );
}

export default App;
