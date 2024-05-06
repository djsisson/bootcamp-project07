import "./NewPost.css";
import { useFetcher } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { useContext } from "react";

export default function NewPost() {
  const fetcher = useFetcher();
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const onFocus = (e) => {
    e.target.select();
  };

  return (
    <div id="newPost-container">
      <fetcher.Form id="newPost" method="Post" action={`/Posts/post/new`}>
        <label htmlFor="message">Message: </label>
        <input
          type="textarea"
          name="message"
          id="newpost-message"
          placeholder="enter a message"
          onFocus={onFocus}
          required={true}
        />
        <input
          type="hidden"
          name="user_id"
          defaultValue={currentUser?.id}
        ></input>
        <button type="submit">New Post</button>
      </fetcher.Form>
    </div>
  );
}
