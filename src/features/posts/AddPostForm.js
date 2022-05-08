import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

//? selectors
import { selectAllUsers } from "../users/userSlice";

import { addNewPost } from "./postsSlice";
const AddPostForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //? local state
  const [userId, setUserId] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  //? store
  const users = useSelector((state) => selectAllUsers(state));

  //? handlers
  const canSave =
    [title, content, userId].every(Boolean) && addRequestStatus === "idle";

  const hanldeSubmit = () => {
    if (canSave) {
      try {
        setAddRequestStatus("pending");
        dispatch(addNewPost({ title, body: content, userId }));

        setTitle("");
        setContent("");
        setUserId("");
        navigate("/");
      } catch (error) {
        console.error("Failed to save the post", error);
      } finally {
        setAddRequestStatus("idle");
      }
    }
  };

  return (
    <section>
      <h2>Add new post</h2>
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
        <button type='button' onClick={hanldeSubmit} disabled={!canSave}>
          Save Post
        </button>
      </form>
    </section>
  );
};

export default AddPostForm;
