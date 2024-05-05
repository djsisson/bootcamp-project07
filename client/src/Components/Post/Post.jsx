import "./Post.css";

export default function Post({ postData }) {
  return (
    <div>
      <div>{postData.id}</div>
      <div>{postData.message}</div>
      <div>{postData.user_id}</div>
    </div>
  );
}
