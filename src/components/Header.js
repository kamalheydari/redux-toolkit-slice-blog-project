import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className='header'>
      <div className='header__content'>
        <h3>Redux Blog</h3>
        <nav>
          <ul>
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? "active" : null)}
                to='/'
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? "active" : null)}
                to='post'
              >
                Add Post
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? "active" : null)}
                to='user'
              >
                Users
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
