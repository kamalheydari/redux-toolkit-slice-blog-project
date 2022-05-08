import React, { useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

//? selectors
import { selectAllUsers } from "../users/userSlice";
import {
  deletePost,
  fetchPosts,
  selectPostById,
  updatePost,
} from "./postsSlice";

const EditPostForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { postId } = useParams();

  //? store
  const post = useSelector((state) => selectPostById(state, Number(postId)));
  const users = useSelector((state) => selectAllUsers(state));

  //? local state
  const [userId, setUserId] = useState(post?.userId);
  const [title, setTitle] = useState(post?.title);
  const [content, setContent] = useState(post?.body);
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  //? handlers
  const canSave =
    [title, content, userId].every(Boolean) && addRequestStatus === "idle";

  const hanldeSubmit = () => {
    if (canSave) {
      try {
        setAddRequestStatus("pending");
        dispatch(
          updatePost({
            id: post.id,
            title,
            body: content,
            userId,
            reactions: post.reactions,
          })
        );
        setTitle("");
        setContent("");
        setUserId("");
        dispatch(fetchPosts());
        navigate(`/post/${post.id}`);
      } catch (error) {
        console.error("Failed to edit the post", error);
      } finally {
        setAddRequestStatus("idle");
      }
    }
  };

  const hanldeDelete = () => {
    try {
      setAddRequestStatus("pending");
      dispatch(deletePost({ id: post.id }));
      setTitle("");
      setContent("");
      setUserId("");
      dispatch(fetchPosts());
      navigate('/');
    } catch (error) {
      console.error("Failed to delete the post", error);
    } finally {
      setAddRequestStatus("idle");
    }
  };

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  return (
    <section>
      <h2>Edit post</h2>
      <form className='form'>
        <label htmlFor='postTitle'>Post Title</label>
        <input
          type='text'
          id='postTitle'
          name='postTitle'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor='postAuthor'>Author</label>
        <select
          id='postAuthor'
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        >
          <option value=''></option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user?.name}
            </option>
          ))}
        </select>
        <label htmlFor='postContent'>Content</label>
        <textarea
          id='postContent'
          name='postContent'
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type='submit' onClick={hanldeSubmit} disabled={!canSave}>
          Edit Post
        </button>
        <button type='button' className='delete' onClick={hanldeDelete}>
          Delete Post
        </button>
      </form>
    </section>
  );
};

export default EditPostForm;
