import { faker } from "@faker-js/faker";1
import { icons } from "./seed_data.js";

import { supaBase } from "../db/supa_db.js";

export const getHashTags = (val) => {
  const re = new RegExp(/#[\p{L}0-9-_]+/ugi)
  return val.toLowerCase().match(re);
};

export const randomWords = () => {
  const words = [];
  for (let i = 0; i < Math.floor(Math.random() * 5) + 1; i++) {
    words.push(`#${faker.lorem.word()}`);
  }
  return words;
};

export const randomMessage = () => {
  return faker.lorem.sentences({ min: 1, max: 3 }, "\n");
};

export const randomName = () => {
  const first_name = faker.person.firstName();
  const last_name = faker.person.lastName();
  const email = faker.internet.email({
    firstName: first_name,
    lastName: last_name,
  });
  const username = `${faker.word.adjective()}_${faker.word.noun()}`.replace(
    " ",
    ""
  );
  const icon_id = parseInt(Math.floor(Math.random() * icons.length) + 1);

  return {
    username: username.toLowerCase(),
    first_name: first_name,
    last_name: last_name,
    email: email,
    icon_id: icon_id,
  };
};

export const upsertTags = async (msgid, tags) => {
  const db = supaBase();
  const reMapTags = Array.from(new Set(tags)).map((x) => {
    return { tag: x };
  });
  const { data, error } = await db
    .from("hashtag")
    .upsert(reMapTags, { ignoreDuplicates: false, onConflict: "tag" })
    .select();
  await insertTagToMsg(
    data.map((x) => {
      return { msg_id: msgid, tag_id: x.id };
    })
  );
};

export const removeTags = async (msgid) => {
  const db = supaBase();
  const { data, error } = await db
    .from("message_tags")
    .delete()
    .eq("msg_id", msgid);
}

const insertTagToMsg = async (tagIds) => {
  const db = supaBase();
  const { data, error } = await db.from("message_tags").insert(tagIds);
};