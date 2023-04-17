export default function CommentCard({ author, body, created_at, votes }) {
  const date = new Date(created_at).toDateString();

  return (
    <section className="CommentCard">
      <section id="CommentHeader">
        <h4>
          Username: <br />
          {author}
        </h4>
        <p>
          Comment Left:
          <br />
          {date}
        </p>
      </section>
      <section id="CommentBody">
        <p>{body}</p>
      </section>
      <section id="CommentFooter">
        <p>Votes: {votes}</p>
      </section>
    </section>
  );
}
