import "./SideBar.css";
import { UserContext } from "../../Context/UserContext";
import { useContext } from "react";
import { NavLink } from "react-router-dom";

export default function SideBar() {
  const {currentUser, setCurrentUser} = useContext(UserContext)
  return (
    <>
      <div id="sidebar">
        <nav>
          <ul>
            <li>
              {currentUser?.username ? <NavLink to={`/User`}>User</NavLink> : <NavLink to={`/Login`}>Login</NavLink>}
            </li>
            <li>
              <NavLink to={`/Posts`}>Posts</NavLink>
            </li>
          </ul>
        </nav>
        <h1>Search</h1>
        <div>
          <form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search"
              placeholder="Search"
              type="search"
              name="q"
            />
            <div id="search-spinner" aria-hidden hidden={true} />
            <div className="sr-only" aria-live="polite"></div>
          </form>
        </div>
        <nav>
          <ul>
            <li>
              <a href={`/contacts/1`}>Your Name</a>
            </li>
            <li>
              <a href={`/contacts/2`}>Your Friend</a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
