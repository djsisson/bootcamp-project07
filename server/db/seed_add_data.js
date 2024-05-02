import Router from "express-promise-router";
import { supaBase } from "../db/supa_db.js";
import { icons, themes } from "./seed_data.js";
import { getHashTags, randomName } from "./helper_functions.js";

const addThemes = async () => {
  const db = supaBase();
  const { data, error } = await db.from("themes").insert(themes).select();
  return { data, error };
};

const addIcons = async () => {
  const db = supaBase();
  const { data, error } = await db.from("icons").insert(icons).select();
  return { data, error };
};

const addUsers = async () => {
  const users = [];
  for (let i = 0; i < 100; i++) {
    users.push(randomName());
  }

  const db = supaBase();
  const { data, error } = await db.from("users").insert(users).select();
  return { data, error };
};

const router = new Router();

router.get("/addbasic", async (req, res) => {
  await addThemes();
  await addIcons();
  await addUsers();
  res.status(200).send();
});

export default router;
