// import { useCreateComment } from "../../hooks/useAPI";
import { useState } from "react";

const PostForm = (post) => {
  // const { createComment, error } = useCreateComment();
  const [formData, setFormData] = useState({
    content: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Post submitted:", formData);
      await createComment(formData);
      resetForm();
    } catch (err) {
      console.error("Failed to create a post:", err);
    }
  };

  const resetForm = (e) => {
    setFormData({ content: "" });
  };

  return (
    <div>
      {error && (
        <div className={styles.errorBox}>
          {error.map((err, i) => (
            <p key={i}>{err.msg}</p>
          ))}
        </div>
      )}
      <form onSubmit={handleSubmit} className={styles.createForm}>
        <div className={styles.inputForm}>
          <textarea
            name="content"
            id="content"
            value={formData.content}
            minLength="2"
            maxLength="300"
            onChange={handleInputChange}
            placeholder="Add a comment"
            required
          />
        </div>
        <div className={styles.buttons}>
          <button type="button" onClick={resetForm}>
            Cancel
          </button>
          <button type="submit">Comment</button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
