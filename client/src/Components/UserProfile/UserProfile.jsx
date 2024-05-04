import "./UserProfile.css";
import { useLoaderData } from "react-router-dom";
import { useEffect } from "react";

export default function UserProfile() {
    const userProfile = useLoaderData()

useEffect(() => {
    console.log(userProfile)
},[userProfile])

    return (<div>{userProfile?.username}hhhh</div>)
}