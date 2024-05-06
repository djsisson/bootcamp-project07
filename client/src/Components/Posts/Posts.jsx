import "./Posts.css";
import { useLoaderData } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { useContext } from "react";
import Post from "../Post/Post";
import NewPost from "../NewPost/NewPost";

export default function Posts({ tags }) {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const posts = useLoaderData();

  return (
    <>
      {currentUser?.username ? <NewPost></NewPost> : null}
      <div id="postlist">
        {posts?.map((post) => {
          return <Post postData={post} key={post.id}></Post>;
        })}
      </div>
    </>
  );
}
