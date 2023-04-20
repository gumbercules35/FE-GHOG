export default function Paginate({ page, setPage, totalCount }) {
  return (
    <section className="Paginate">
      <h4>
        Page {page} of {Math.ceil(totalCount / 10)}
      </h4>
      {page === 1 ? null : (
        <button
          disabled={page === 1}
          onClick={() => {
            setPage((currentPage) => {
              return currentPage - 1;
            });
          }}
        >
          <i className="fa fa-arrow-left"></i>
        </button>
      )}
      {10 * page >= totalCount ? null : (
        <button
          disabled={10 * page >= totalCount}
          onClick={() => {
            setPage((currentPage) => {
              return currentPage + 1;
            });
          }}
        >
          <i className="fa fa-arrow-right"></i>
        </button>
      )}
    </section>
  );
}
