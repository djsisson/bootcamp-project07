import Router from "express-promise-router";
import { faker } from "@faker-js/faker";
import { supaBase } from "../db/supa_db.js";
import { icons, themes } from "./seed_data.js";
import {
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
  const msgs = [];
  const allTags = [];
  for (let i = 0; i < 200; i++) {
    const userId = Math.floor(Math.random() * 100) + 1;
    const rndTags = [
      ...randomWords(),
      `#${(themeIds[userId].icons.themes.name).toLowerCase()}`,
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
    msgs.push(msgToSend);
    allTags.push(rndTags);
  }


  const msgIds = await db.from("messages").insert(msgs).select();
  const reMapTags = Array.from(new Set(allTags.flat())).map((x) => {
    return { tag: x };
  });

  
  const tagIds = await db.from("hashtag").insert(reMapTags).select();
  const junction = msgIds.data.map((x, i) => 
    allTags[i].map((y) => ({
      msg_id: x.id,
      tag_id: tagIds.data.find((z) => z.tag == y).id,
    })),
  );
  await db.from("message_tags").insert(junction.flat()).select()
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
