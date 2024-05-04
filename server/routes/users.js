import Router from "express-promise-router";
import { supaBase } from "../db/supa_db.js";
import { randomName } from "../db/helper_functions.js";

const router = new Router();

export default router;

router.get("/", async (req, res) => {
  const db = supaBase();
  const { data, error } = await db.from("users").select("*, icons (*, themes (*))");
  if (error) {
    res.status(500).send();
    return;
  }
  res.status(200).send(data);
});
router.get("/random/", async (req, res) => {
  res.status(200).send(randomName());
});

router.get("/name/:username", async (req, res) => {
  const db = supaBase();
  const { data, error } = await db
    .from("users")
    .select("*, icons (*, themes (*))")
    .eq("username", req.params.username.toLowerCase());
  if (error) {
    res.status(500).send();
    return;
  }
  res.status(200).send(data);
});

router.get("/:userid", async (req, res) => {
  const db = supaBase();
  const { data, error } = await db
    .from("users")
    .select("*, icons (*, themes (*))")
    .eq("id", req.params.userid);
  if (error) {
    res.status(500).send();
    return;
  }
  res.status(200).send(data);
});

router.post("/", async (req, res) => {
  const db = supaBase();
  const { data, error } = await db.from("users").insert({...req.body, username: req.body?.username.toLowerCase()}).select();
  if (error) {
    res.status(500).send(error);
    return;
  }
  res.status(201).send(data);
  return;
});

router.post("/random", async (req, res) => {
  const db = supaBase();
  const { data, error } = await db.from("users").insert(randomName()).select();
  console.log(error)
  if (error) {
    res.status(500).send(error);
    return;
  }
  res.status(201).send(data);
  return;
});

router.put("/:userid", async (req, res) => {
  const db = supaBase();
  const { data, error } = await db
    .from("users")
    .update({...req.body, username: req.body?.username.toLowerCase()})
    .eq("id", req.params.userid)
    .select();
  if (error) {
    res.status(500).send();
    return;
  }
  res.status(200).send(data);
});

router.delete("/:userid", async (req, res) => {
  const db = supaBase();
  const { data, error } = await db
    .from("users")
    .delete()
    .eq("id", req.params.userid);
  if (error) {
    res.status(500).send();
    return;
  }
  res.status(204).send(data);
});
