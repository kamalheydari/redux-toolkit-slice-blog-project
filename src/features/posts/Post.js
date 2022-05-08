import React from "react";

import { Link } from "react-router-dom";

import { formatDistanceToNow, parseISO } from "date-fns";

import { useSelector } from "react-redux";

//? selectors
import { selectUserById } from "../users/userSlice";

//? components
import ReactionButtons from "./ReactionButtons";

const Post = ({ singlePage, post }) => {
  //? store
  const user = useSelector((state) =>
    selectUserById(state, Number(post.userId))
  );

  //? helper
  let timeAgo = "";
  if (post.date) {
    const date = parseISO(post.date);
    const timePeriod = formatDistanceToNow(date);
    timeAgo = `${timePeriod} ago`;
  }

  return (
    <article className='post'>
      <h2 className='post__title'>
        {singlePage ? post.title : post.title.substring(0, 30)}
      </h2>
      <p className='post__content'>
        {singlePage ? post.body : post.body.substring(0, 80)}...
      </p>
      <div className='post__info'>
        {singlePage ? (
          <Link to={`/post/edit/${post.id}`}>Edit Post</Link>
        ) : (
          <Link to={`post/${post.id}`}>View Post</Link>
        )}
        by <Link to={`/user/${post.userId}`}>{user?.name}</Link>
        <span>
          &nbsp; <i>{timeAgo}</i>
        </span>
      </div>
      <ReactionButtons post={post} />
    </article>
  );
};

export default React.memo(Post);
