import { useCreateComment } from "../hooks/useAPI";
import { useState } from "react";
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

  return (
    <div>
      {error && (
        <div style={{ color: "red" }}>
          {error.map((err, i) => (
            <p key={i}>{err.msg}</p>
          ))}
        </div>
      )}
      <form onSubmit={handleSubmit} className="create-form">
        <h3>Add a new comment</h3>
        <div className="input-form">
          <label htmlFor="text">Text: </label>
          <textarea
            name="content"
            id="content"
            value={formData.content}
            minLength="2"
            maxLength="30"
            onChange={handleInputChange}
            required
          />
        </div>

        <button type="submit" className="create-button">
          Add
        </button>
      </form>
    </div>
  );
};

export default CommentForm;
