import { useState } from "react";
import { useUpdateComment, useDeleteComment } from "../hooks/useAPI";

const Comment = ({ comment, currentUserId, onCommentUpdate, postId }) => {
  const isAuthor = currentUserId === comment.author.id;
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const { updateComment, error } = useUpdateComment();
  const { deleteComment, deleteError } = useDeleteComment();

  const handleSave = async (e) => {
    e.preventDefault();
    setIsEditing(false);
    try {
      console.log("Comment updated:", editedContent);
      await updateComment(
        comment.id,
        { content: editedContent },
        postId,
        onCommentUpdate
      );
    } catch (err) {
      console.error("Failed to update a comment:", err);
    }
  };

  return (
    <div className="comment">
      {isEditing ? (
        <>
          {error && (
            <div style={{ color: "red" }}>
              {error.map((err, i) => (
                <p key={i}>{err.msg}</p>
              ))}
            </div>
          )}
          {deleteError && (
            <div style={{ color: "red" }}>
              {error.map((err, i) => (
                <p key={i}>{err.msg}</p>
              ))}
            </div>
          )}
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
          <button
            onClick={() => {
              setEditedContent(comment.content);
              setIsEditing(false);
            }}
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <p>{comment.content}</p>
          {isAuthor && (
            <div className="controls">
              <button onClick={() => setIsEditing(true)}>Edit</button>
              <button
                onClick={() =>
                  deleteComment(comment.id, postId, onCommentUpdate)
                }
              >
                Delete
              </button>
            </div>
          )}
          <small>
            By {comment.author.firstName} {comment.author.lastName}
          </small>
        </>
      )}
    </div>
  );
};

export default Comment;
