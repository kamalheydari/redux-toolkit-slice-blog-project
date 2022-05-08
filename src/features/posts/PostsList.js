import { useSelector } from "react-redux";

//? selectors
import {
  selectAllPosts,
  selectPostsError,
  selectPostsStatus,
} from "./postsSlice";

//? components
import Post from "./Post";

const PostsList = () => {
  //? store
  const posts = useSelector(selectAllPosts);
  const status = useSelector(selectPostsStatus);
  const error = useSelector(selectPostsError);

  let content;
  if (status === "loading") {
    content = <p>'loading'</p>;
  } else if (status === "succeeded") {
    content = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date))
      .map((post) => <Post key={post.id} post={post} />);
  } else if (status === "failed") {
    content = <p>{error}</p>;
  }

  return <section className='posts-list'>{content}</section>;
};

export default PostsList;
