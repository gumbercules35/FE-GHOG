export default function Error({ errCode }) {
  console.log("🚀 ~ file: Error.jsx:2 ~ errCode:", errCode);

  switch (errCode) {
    case 400:
      return (
        <section>
          <h2>Status 400 Bad Request!</h2>
        </section>
      );
    case 404:
      return (
        <section>
          <h2>Status 404 Not Found!</h2>
        </section>
      );
    default:
      return (
        <section>
          <h2>
            Well this is embarrasing, it seems we havent handled errors for
            Status:{errCode} just yet!
          </h2>
        </section>
      );
  }
}
