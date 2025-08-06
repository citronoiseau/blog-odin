import { useState } from "react";
import { useCreatePost } from "../../hooks/posts/useCreatePost";
import styles from "./PostForm.module.css";

const PostForm = () => {
  const { createPost, error } = useCreatePost();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    isPublished: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    const newValue = type === "radio" ? value === "true" : value;
    setFormData({ ...formData, [name]: newValue });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Post submitted:", formData);
      await createPost(formData);
      resetForm();
    } catch (err) {
      console.error("Failed to create a post:", err);
    }
  };

  const resetForm = (e) => {
    setFormData({ title: "", content: "", isPublished: false });
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
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className={styles.inputForm}>
          <textarea
            name="content"
            id="content"
            value={formData.content}
            minLength="2"
            maxLength="300"
            onChange={handleInputChange}
            placeholder="Start your beautiful blog here"
            required
          />
        </div>
        <div className={styles.inputForm}>
          <fieldset>
            <legend>Publish your post immediately?</legend>
            <div>
              <input
                type="radio"
                id="yesChoice"
                name="isPublished"
                value="true"
                checked={formData.isPublished === true}
                onChange={handleInputChange}
              />
              <label htmlFor="yesChoice">Yes</label>

              <input
                type="radio"
                id="noChoice"
                name="isPublished"
                value="false"
                checked={formData.isPublished === false}
                onChange={handleInputChange}
              />
              <label htmlFor="noChoice">No</label>
            </div>
          </fieldset>
        </div>
        <div className={styles.buttons}>
          <button type="button" onClick={resetForm}>
            Cancel
          </button>
          <button type="submit">Create</button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
