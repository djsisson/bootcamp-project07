import Router from "express-promise-router";
import { faker } from "@faker-js/faker";
import { supaBase } from "../db/supa_db.js";
import { icons, themes } from "./seed_data.js";
import {
  upsertTags,
  randomName,
  randomMessage,
  randomWords,
} from "./helper_functions.js";

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

const addMessages = async () => {
  const db = supaBase();

  const { data, error } = await db
    .from("users")
    .select("*, icons (*, themes (*))");
  const themeIds = data;
  for (let i = 0; i < 200; i++) {
    const userId = Math.floor(Math.random() * 100) + 1;
    const rndTags = [
      ...randomWords(),
      `#${themeIds[userId].icons.themes.name}`,
    ];
    const createdDate = faker.date.recent({ days: 365 });
    const msgToSend = {
      message: `${randomMessage()} ${rndTags.join(" ")}`,
      created: createdDate,
      updated: faker.date.between({
        from: createdDate,
        to: Date.now(),
      }),
      user_id: userId,
    };
    const { data, error } = await db
      .from("messages")
      .insert(msgToSend)
      .select();
    await upsertTags(data[0].id, rndTags);
  }
};

const router = new Router();

router.get("/addbasic", async (req, res) => {
  await addThemes();
  await addIcons();
  await addUsers();
  res.status(200).send();
});

router.get("/addmessages", async (req, res) => {
  await addMessages();
  res.status(200).send();
});

export default router;
