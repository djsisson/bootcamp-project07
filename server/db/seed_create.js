import * as db from "./pg_db.js";
import Router from "express-promise-router";

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

const router = new Router();

router.get("/", async (req, res) => {
  await dropTables();
  await createTables();
  res.status(200).send();
});

export default router;
