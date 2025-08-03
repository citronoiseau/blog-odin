import { useCreateComment } from "../../hooks/comments/useCreateComment";
import { useState } from "react";
import styles from "./CommentForm.module.css";

const CommentForm = ({ postId, onCommentCreated }) => {
  const { createComment, error } = useCreateComment();
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
      console.log("Comment submitted:", formData);
      await createComment(formData, postId, onCommentCreated);
      setFormData({ content: "" });
    } catch (err) {
      console.error("Failed to create a comment:", err);
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

export default CommentForm;
