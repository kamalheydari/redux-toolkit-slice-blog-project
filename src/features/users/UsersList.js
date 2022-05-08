import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

//? selectors
import { selectAllUsers } from "./userSlice";

const UsersList = () => {
  //? store
  const users = useSelector((state) => selectAllUsers(state));


  return (
    <section className="users">
      <h2>Users</h2>
      <ul className='users-list'>
        {users.map((user) => (
          <li key={user.id}>
            <Link to={`/user/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default UsersList;
