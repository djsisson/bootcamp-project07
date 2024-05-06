export const db = import.meta.env.VITE_SERVER_URL;
import { redirect } from "react-router-dom";

export async function getRandomUser() {
  const response = await fetch(`${db}/users/random`);
  const data = await response.json();
  return data;
}

export async function getUserByName({ params }) {
  let username = params?.username || "";
  if (username == "") {
    const data = JSON.parse(localStorage.getItem("GuestBookUser")) || {
      username: "",
    };
    if (data.username == "") {
      return "";
    }
    username = data.username;
  }
  const response = await fetch(`${db}/users/name/${username}`);
  const data = await response.json();
  if (!data || data?.length == 0) {
    return redirect("/Login/true");
  }
  return data[0];
}

export async function getPosts() {
  const response = await fetch(`${db}/messages`);
  const data = await response.json();
  return data;
}

export async function getTags({ params }) {
  let filter = params.tag ?? "";
  if (filter) filter = `search/${params.tag}`;
  const response = await fetch(`${db}/tags/${filter}`);
  const data = await response.json();
  return data;
}

export async function getPostsByUser({ params }) {
  const filter = params.user ?? "";
  const response = await fetch(`${db}/messages/user/${params.user ?? ""}`);
  const data = await response.json();
  return data;
}

export async function getPostsByTag({ params }) {
  const response = await fetch(`${db}/tags/${params.tag ?? ""}`);
  const data = await response.json();
  return data;
}

export async function newUser({ request, params }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  const response = await fetch(`${db}/users`, {
    method: "POST",
    body: JSON.stringify(updates),
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();
  return redirect(`/User/${updates.username}`);
}

export async function editUser({ request, params }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  const response = await fetch(`${db}/users/${updates.id}`, {
    method: "PUT",
    body: JSON.stringify(updates),
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();
  return redirect(`/Posts`);
}

export async function newPost({ request, params }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  const response = await fetch(`${db}/messages/${updates.user_id}`, {
    method: "POST",
    body: JSON.stringify(updates),
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();
  return redirect(`/Posts/`);
}

export async function editPost({ request, params }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  const response = await fetch(`${db}/messages/${updates.id}`, {
    method: "PUT",
    body: JSON.stringify(updates),
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();
  return redirect(`/Posts/user/${updates.user_id}`);
}

export async function deletePost({ request, params }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  const response = await fetch(`${db}/messages/${updates.id}`, {
    method: "DELETE",
    body: JSON.stringify(updates),
    headers: { "Content-Type": "application/json" },
  });
  return redirect(`/Posts/`);
}