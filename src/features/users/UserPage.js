import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

//?selectors
import { selectPostByUser } from "../posts/postsSlice";
import { selectUserById } from "./userSlice";

const UserPage = () => {
  const { userId } = useParams();

  //? store
  const user = useSelector((state) => selectUserById(state, Number(userId)));
  const posts = useSelector((state) => selectPostByUser(state, Number(userId)));

  return (
    <section className='user-page'>
      <h2>{user?.name}</h2>
      <ol>
        {posts.map((post) => (
          <li key={post.id}>
            <Link to={`/post/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ol>
    </section>
  );
};

export default UserPage;
