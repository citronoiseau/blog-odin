import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { usePost } from "../../hooks/posts/usePost";
import { useCreatePost } from "../../hooks/posts/useCreatePost";
import { useUpdatePost } from "../../hooks/posts/useUpdatePost";
import { Editor } from "@tinymce/tinymce-react";
import styles from "./PostForm.module.css";

const PostForm = () => {
  const { postId } = useParams(); // if there's an id in the URL, we're editing
  const navigate = useNavigate();
  const isEditing = Boolean(postId);

  const { createPost, error: createError } = useCreatePost();
  const { post, loading, error: fetchError } = usePost(postId);
  const { updatePost, error: updateError } = useUpdatePost();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    isPublished: false,
  });

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        content: post.content,
        isPublished: post.isPublished,
      });
    }
  }, [post]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === "isPublished" ? value === "true" : value;
    console.log("Changing", name, "to", newValue, typeof newValue);
    setFormData({ ...formData, [name]: newValue });
  };

  const handleEditorChange = (content) => {
    setFormData({ ...formData, content });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Post submitted:", formData);
      if (isEditing) {
        await updatePost(postId, formData);
      } else {
        await createPost(formData);
      }
      resetForm();
    } catch (err) {
      console.error("Failed to create a post:", err);
    }
  };

  const resetForm = () => {
    setFormData({ title: "", content: "", isPublished: false });
  };

  const handleCancel = () => {
    resetForm();
    navigate("/");
  };
  if (loading && isEditing) return <div>Loading post...</div>;

  return (
    <div className={styles.postForm}>
      <form onSubmit={handleSubmit} className={styles.createForm}>
        <h2>{isEditing ? "Edit Post" : "Create Post"}</h2>
        {(createError || updateError || fetchError) && (
          <div className={styles.errorBox}>
            {Array.isArray(createError || updateError) ? (
              (createError || updateError).map((err, i) => (
                <p key={i}>{err.msg}</p>
              ))
            ) : (
              <p>{fetchError}</p>
            )}
          </div>
        )}
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
          <Editor
            apiKey={import.meta.env.VITE_TINYMCE_KEY}
            value={formData.content}
            init={{
              height: 400,
              menubar: false,
              placeholder: "Start your beautiful post here...",
              plugins: "link image code lists",
              toolbar:
                "undo redo | formatselect | bold italic | alignleft aligncenter alignright | bullist numlist | link image | code",
            }}
            onEditorChange={handleEditorChange}
          />
        </div>
        <div className={styles.inputForm}>
          <fieldset>
            <legend>Publish immediately?</legend>
            <div className={styles.fieldChoices}>
              <div className={styles.fieldChoice}>
                <input
                  type="radio"
                  id="yesChoice"
                  name="isPublished"
                  value="true"
                  checked={formData.isPublished === true}
                  onChange={handleInputChange}
                />
                <label htmlFor="yesChoice">Yes</label>
              </div>
              <div className={styles.fieldChoice}>
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
            </div>
          </fieldset>
        </div>
        <div className={styles.buttons}>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
          <button type="submit">{isEditing ? "Update" : "Create"}</button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
