import "./Post.css";
import { NavLink,useNavigate } from "react-router-dom";
import Avatar from "../Avatar/Avatar";

let tagId = 0;

export default function Post({ postData }) {
  const navigate = useNavigate();
  const splitMessageTags = () => {
    const re = new RegExp(/(#[\p{L}0-9-_]+)/giu);
    const newMessage = postData.message.split(re);

    return newMessage.map((msg) => {
      if (msg.charAt(0) == "#") {
        tagId++;
        return (
          <NavLink key={tagId} to={`/Posts/tag/${msg.slice(1)}`}>
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

  return (
    <>
      <div className="profile-select" onClick={onClick}>
        <Avatar user={postData.user}></Avatar>
      </div>
      <div className="messageContent">{splitMessageTags()}</div>
    </>
  );
}
