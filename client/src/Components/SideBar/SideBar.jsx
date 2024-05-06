import "./SideBar.css";
import { UserContext } from "../../Context/UserContext";
import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Tags from "../Tags/Tags";
import Avatar from "../Avatar/Avatar";

export default function SideBar() {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [showSideBar, setShowSideBar] = useState(true);
  const navigate = useNavigate();
  const onClick = () => {
    navigate(`/User/${currentUser?.username}`);
  };

  const showSidebar = () =>{
    setShowSideBar(!showSideBar)
  }

  return (
    <>
      <div id="sidebar-container">
        <span id="burger-fill">
          <svg
            id="sidebar-burger"
            onClick={showSidebar}
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 0 24 24"
            width="24"
            focusable="false"
          >
            <path d="M21 6H3V5h18v1zm0 5H3v1h18v-1zm0 6H3v1h18v-1z"></path>
          </svg>
        </span>{showSideBar ? 
        <div id="sidebar">
          <nav>
            <ul>
              {currentUser?.username ? (
                <li id="sidebar-icon" onClick={onClick}>
                  <Avatar user={currentUser.icon}></Avatar>
                </li>
              ) : null}

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
        </div> : null }
      </div>
    </>
  );
}
