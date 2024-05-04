const db = import.meta.env.VITE_SERVER_URL;
import {  redirect } from "react-router-dom";

export async function getRandomUser() {
  const response = await fetch(`${db}/users/random`);
  const data = await response.json();
  return data;
}

export async function getUserByName({params}) {
  const response = await fetch(`${db}/users/name/${params.username}`);
  const data = await response.json();
  if(!data || data?.length ==0){
    return redirect("/Login/true")
  }
  return data[0];
}
