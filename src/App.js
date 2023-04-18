import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import ReviewList from "./components/ReviewList";
import SingleReview from "./components/SingleReview";
import { user } from "./assets/exampleUser";
import { useState } from "react";
import CategoryList from "./components/CategoryList";
function App() {
  const [activeUser, setActiveUser] = useState(user);

  return (
    <div className="App">
      <Header {...activeUser} />
      <Navigation />
      <Routes>
        <Route path="/" element={<ReviewList />} />
        <Route path="/reviews" element={<ReviewList />} />
        <Route
          path="/reviews/:review_id"
          element={<SingleReview username={activeUser.username} />}
        />
        <Route path="/categories" element={<CategoryList />} />
      </Routes>
    </div>
  );
}

export default App;
