const CommentForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send to API)
    const formData = new FormData(e.target);
    console.log("Submitted:", formData.get("text"));
  };

  return (
    <div>
      <form id="create-form" onSubmit={handleSubmit}>
        <h3>Create a new comment</h3>
        <div className="input-form">
          <label htmlFor="text">Text: </label>
          <textarea
            name="text"
            id="text"
            minLength="2"
            maxLength="30"
            required
          />
        </div>

        <button type="submit" className="create-button">
          Create
        </button>
      </form>
    </div>
  );
};

export default CommentForm;
