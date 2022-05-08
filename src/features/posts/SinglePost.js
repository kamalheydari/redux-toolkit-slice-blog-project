import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

//? components
import Post from "./Post";

//? selectors
import { selectPostById } from "./postsSlice";

const SinglePostForm = () => {
  const { postId } = useParams();

  //? store
  const post = useSelector((state) => selectPostById(state, Number(postId)));

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  return <Post post={post} singlePage />;
};

export default SinglePostForm;
