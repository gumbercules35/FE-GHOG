export default function CommentForm(props) {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <section class="FormContainer">
      <form onSubmit={handleSubmit}></form>
    </section>
  );
}
