import "./Posts.css"
import { useLoaderData } from "react-router-dom";
import Post from "../Post/Post";

export default function Posts({tags}){
    const posts = useLoaderData();

    return (<div id="postlist">{posts?.map((post) =>{
        return(<Post postData={post} key={post.id}></Post>)
    })}</div>)
}