import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Navigation from "./components/Navigation";

import SingleReview from "./components/SingleReview";
import { user } from "./assets/exampleUser";
import { useState } from "react";
import CategoryList from "./components/CategoryList";
import Error from "./components/Error";
import ReviewsView from "./components/ReviewsView";
function App() {
  const [activeUser, setActiveUser] = useState(user);

  return (
    <div className="App">
      <Header {...activeUser} />
      <Navigation />
      <Routes>
        <Route path="/" element={<ReviewsView />} />
        <Route path="/reviews" element={<ReviewsView />} />
        <Route
          path="/reviews/:review_id"
          element={<SingleReview username={activeUser.username} />}
        />
        <Route path="/categories" element={<CategoryList />} />
        <Route path="*" element={<Error errCode={404} />} />
      </Routes>
    </div>
  );
}

export default App;
