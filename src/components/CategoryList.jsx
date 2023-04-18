import { useEffect, useState } from "react";
import * as api from "../api";
import CategoryCard from "./CategoryCard";
export default function CategoryList(props) {
  const [activeCategories, setActiveCategories] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    api.getCategories().then((categories) => {
      setActiveCategories(categories);
      setIsLoading(false);
    });
  }, []);
  return isLoading ? (
    <h2>Loading Please Wait</h2>
  ) : (
    <section className="CategoryListContainer">
      <h2>Choose a Category</h2>
      <ul>
        {activeCategories.map((category) => {
          return (
            <li key={category.slug}>
              <CategoryCard {...category} />
            </li>
          );
        })}
      </ul>
    </section>
  );
}
