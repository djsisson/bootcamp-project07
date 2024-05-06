import "./NewPost.css";
import { useFetcher } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { useContext, useEffect, useState } from "react";

export default function NewPost() {
  const fetcher = useFetcher();
  const [message, setMessage] = useState("")
  const { currentUser, setCurrentUser } = useContext(UserContext);

  useEffect(() => {
    if (fetcher.state=="submitting") {
      setMessage("")
    }
  }, [fetcher]);

  const onFocus = (e) => {
    e.target.select();
  };

  const onChange = (e) => {
    setMessage(e.target.value)
  }

  return (
    <div id="newPost-container">
      <fetcher.Form id="newPost" method="Post" action={`/Posts/post/new`}>
        <label htmlFor="message" hidden>Message: </label>
        <input
          type="textarea"
          name="message"
          value={message}
          id="newpost-message"
          placeholder="Enter a message ..."
          onFocus={onFocus}
          onChange={onChange}
          required={true}
        />
        <input
          type="hidden"
          name="user_id"
          defaultValue={currentUser?.id}
        ></input>
        <button type="submit">New Post</button>
        <div id="search-spinner" aria-hidden hidden={fetcher.state=="idle"} />
      </fetcher.Form>
    </div>
  );
}
