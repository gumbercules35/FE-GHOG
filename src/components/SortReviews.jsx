import { useState } from "react";

export default function SortReviews({
  setSearchParams,
  setIsLoading,
  searchParams,
  setPage,
  setLimit,
}) {
  const [sortOrderSelect, setSortOrderSelect] = useState("desc");
  const [sortBySelect, setSortBySelect] = useState("created_at");
  const [selectLimit, setSelectLimit] = useState(12);

  const submitSort = (e) => {
    e.preventDefault();
    const cloneParams = new URLSearchParams(searchParams);
    cloneParams.set("order", sortOrderSelect);
    cloneParams.set("sort_by", sortBySelect);
    setSearchParams(cloneParams);
    setPage(1);
    setLimit(selectLimit);
  };

  return (
    <section>
      <form onSubmit={submitSort}>
        <label htmlFor="sortBy">Sort By:</label>
        <select
          name="Sort By"
          id="sortBy"
          value={sortBySelect}
          onChange={(event) => {
            setSortBySelect(event.target.value);
          }}
        >
          <option value="review_id">Review ID</option>
          <option value="title">Title</option>
          <option value="category">Category</option>
          <option value="designer">Designer</option>
          <option value="created_at">Date Posted</option>
          <option value="votes">Votes</option>
          <option value="comment_count">Comment Count</option>
        </select>
        <label htmlFor="sortOrder">Sort Order:</label>
        <select
          name="Sort Order"
          id="sortOrder"
          value={sortOrderSelect}
          onChange={(event) => {
            setSortOrderSelect(event.target.value);
          }}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
        <label htmlFor="limit">Items Per Page:</label>
        <select
          name="limit"
          id="limit"
          value={selectLimit}
          onChange={(e) => {
            setSelectLimit(e.target.value);
          }}
        >
          <option value={2}>2</option>
          <option value={4}>4</option>
          <option value={8}>8</option>
          <option value={12}>12</option>
          <option value={25}>25</option>
        </select>
        <button type="submit">Sort!</button>
      </form>
    </section>
  );
}
