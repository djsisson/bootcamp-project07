import "./SideBar.css";
import { UserContext } from "../../Context/UserContext";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import Tags from "../Tags/Tags";

export default function SideBar() {
  const {currentUser, setCurrentUser} = useContext(UserContext)
  return (
    <>
      <div id="sidebar">
        <nav>
          <ul>
            <li>
              {currentUser?.username ? <NavLink to={`/User/${currentUser.username}`}>{currentUser.username}</NavLink> : <NavLink to={`/Login`}>Login</NavLink>}
            </li>
            <li>
              <NavLink to={`/Posts`}>Posts</NavLink>
            </li>
          </ul>
        </nav>
        <Tags></Tags>
      </div>
    </>
  );
}
