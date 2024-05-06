import "./Post.css";
import { NavLink, useNavigate, useFetcher } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { useContext } from "react";
import Avatar from "../Avatar/Avatar";

export default function Post({ postData }) {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const fetcher = useFetcher();
  const navigate = useNavigate();
  const splitMessageTags = () => {
    const re = new RegExp(/(#[\p{L}0-9-_]+)/giu);
    const newMessage = postData.message.split(re);

    return newMessage.map((msg, i) => {
      if (msg.charAt(0) == "#") {
        return (
          <NavLink key={`tag-${i}`} to={`/Posts/tag/${msg.slice(1)}`}>
            {msg}
          </NavLink>
        );
      } else {
        return msg;
      }
    });
  };

  const onClick = () => {
    navigate(`/Posts/user/${postData.user_id}`);
  };

  const onDelete = () => {
    fetcher.submit(
      { id: postData.id },
      { method: "DELETE", action: `/Posts/post/delete/${postData.id}` }
    );
  };

  return fetcher.state == "idle" ? (
    <>
      <div className="profile-select" onClick={onClick}>
        <Avatar user={postData.user}></Avatar>
      </div>
      <div
        className="messageContent"
        style={{ "--bgcolour": postData.user.icon.theme.colour }}
      >
        <div className="post-user-details">
          <span className="clickName" onClick={onClick}>
            @{postData.user.username}
          </span>
          {currentUser.id == postData.user_id ? (
            <span className="delete-post" onClick={onDelete}>
              &#x1F5D1;
            </span>
          ) : null}
        </div>

        <div>{splitMessageTags()}</div>
      </div>
    </>
  ) : null;
}
