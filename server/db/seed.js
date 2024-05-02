import * as db from "../db/db.js";
import Router from "express-promise-router";
import { icons, themes } from "./seed_data.js";
import { getHashTags, randomName } from "./helper_functions.js";

const createTables = async () => {
  await db.query(`
    CREATE TABLE IF NOT EXISTS themes (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL UNIQUE,
        colour TEXT NOT NULL UNIQUE,
        path TEXT NOT NULL UNIQUE )`);

  await db.query(`
    CREATE TABLE IF NOT EXISTS icons (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL UNIQUE,
        path TEXT NOT NULL UNIQUE,
        theme_id INTEGER REFERENCES themes (id)
            ON DELETE RESTRICT
            ON UPDATE RESTRICT)`);

  await db.query(`
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username TEXT NOT NULL UNIQUE,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        icon_id INTEGER REFERENCES icons (id)
            ON DELETE RESTRICT
            ON UPDATE RESTRICT,
        CONSTRAINT validname CHECK (username ~ '^[a-zA-Z0-9_-]+$'))`);

  await db.query(`
    CREATE TABLE IF NOT EXISTS messages (
        id SERIAL PRIMARY KEY,
        message TEXT NOT NULL,
        created TIMESTAMP ,
        updated TIMESTAMP ,
        user_id INTEGER REFERENCES users (id)
            ON DELETE CASCADE
            ON UPDATE CASCADE)`);

  await db.query(`
    CREATE TABLE IF NOT EXISTS message_votes (
        msg_id INTEGER REFERENCES messages (id)
            ON DELETE CASCADE
            ON UPDATE CASCADE,
        user_id INTEGER REFERENCES users (id)
            ON DELETE CASCADE
            ON UPDATE CASCADE,
        liked INTEGER NOT NULL,
        PRIMARY KEY (msg_id, user_id))`);

  await db.query(`
    CREATE TABLE IF NOT EXISTS hashtag (
            id SERIAL PRIMARY KEY,
            name TEXT NOT NULL)`);

  await db.query(`
    CREATE TABLE IF NOT EXISTS message_tags (
        msg_id INTEGER REFERENCES messages(id)
            ON DELETE CASCADE
            ON UPDATE CASCADE,
        tag_id INTEGER REFERENCES hashtag(id)
            ON DELETE CASCADE
            ON UPDATE CASCADE,
        PRIMARY KEY (msg_id, tag_id)
      )`);

  await db.query(`
    CREATE TABLE IF NOT EXISTS user_follows (
        user_id INTEGER REFERENCES users(id)
            ON DELETE CASCADE
            ON UPDATE CASCADE,
        follow_id INTEGER REFERENCES users(id)
            ON DELETE CASCADE
            ON UPDATE CASCADE,
        PRIMARY KEY (user_id, follow_id)
      )`);

  await db.query(`
      CREATE TABLE IF NOT EXISTS user_subscribes (
          user_id INTEGER REFERENCES users(id)
              ON DELETE CASCADE
              ON UPDATE CASCADE,
          tag_id INTEGER REFERENCES hashtag(id)
              ON DELETE CASCADE
              ON UPDATE CASCADE,
          PRIMARY KEY (user_id, tag_id)
        )`);
};

const dropTables = async () => {
  await db.query(`DROP TABLE IF EXISTS user_subscribes
                CASCADE`);
  await db.query(`DROP TABLE IF EXISTS user_follows
                CASCADE`);
  await db.query(`DROP TABLE IF EXISTS message_tags
                CASCADE`);
  await db.query(`DROP TABLE IF EXISTS hashtag
                CASCADE`);
  await db.query(`DROP TABLE IF EXISTS message_votes
                CASCADE`);
  await db.query(`DROP TABLE IF EXISTS messages
                CASCADE`);
  await db.query(`DROP TABLE IF EXISTS users
                CASCADE`);
  await db.query(`DROP TABLE IF EXISTS icons
                CASCADE`);
  await db.query(`DROP TABLE IF EXISTS themes
                 CASCADE`);
};

const addThemes = async () => {
  const sqlParams = themes
    .map((x) => `('${x.name}', '${x.colour}', '${x.path}')`)
    .join();
  const { rows } =
    await db.query(`INSERT INTO themes (name, colour, path) VALUES
    ${sqlParams} RETURNING *`);
  return rows;
};

const addIcons = async () => {
  const sqlParams = icons
    .map((x) => `('${x.name}', '${x.path}', '${x.theme_id}')`)
    .join();
  const { rows } =
    await db.query(`INSERT INTO icons (name, path, theme_id) VALUES
    ${sqlParams} RETURNING *`);
  return rows;
};

const addUsers = async () => {
  const client = await db.getClient();

  try {
    await client.query("BEGIN");

    for (let i = 0; i < 100; i++) {
      const { rows } = await client.query(
        `INSERT INTO users (username, first_name, last_name, email, icon_id) VALUES ($1, $2, $3, $4, $5)`,
        [...randomName()]
      );
    }
    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release;
  }
};

const router = new Router();

router.get("/remake", async (req, res) => {
  await dropTables();
  await createTables();
  res.status(200).send();
});

router.get("/addbasic", async (req, res) => {
  await addThemes();
  await addIcons();
  await addUsers();
  res.status(200).send();
});

export default router;
