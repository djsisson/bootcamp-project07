import "./SideBar.css";
import { UserContext } from "../../Context/UserContext";
import { useContext } from "react";
import { NavLink,useNavigate } from "react-router-dom";
import Tags from "../Tags/Tags";
import Avatar from "../Avatar/Avatar";

export default function SideBar() {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();
  const onClick = () => {
    navigate(`/User/${currentUser?.username}`)
  }
  return (
    <>
      <div id="sidebar" >
        <nav>
          <ul>
            <li id="sidebar-icon" onClick={onClick}>
              {currentUser?.username ? (
                <Avatar user={currentUser} sidebar={true}></Avatar>
              ) : null}
            </li>
            <li>
              {currentUser?.username ? (
                <>
                  <NavLink to={`/User/${currentUser.username}`}>
                    {currentUser.username}
                  </NavLink>
                </>
              ) : (
                <NavLink to={`/Login`}>Login</NavLink>
              )}
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
