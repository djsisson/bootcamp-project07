import Router from "express-promise-router";
import { supaBase } from "../db/supa_db.js";
import { getHashTags, upsertTags, removeTags } from "../db/helper_functions.js";

const router = new Router();

export default router;

router.get("/", async (req, res) => {
  const db = supaBase();
  const { data, error } = await db
    .from("messages")
    .select(
      "*, hashtag(tag), user:users!messages_user_id_fkey(*,icon:icons (*, theme:themes (*)))"
    )
    .order("updated", { ascending: false })
    .limit(50);
  if (error) {
    res.status(500).send();
    return;
  }
  res.status(200).send(data);
});

router.get("/:msgid", async (req, res) => {
  const db = supaBase();
  const { data, error } = await db
    .from("messages")
    .select(
      "*, hashtag(tag), user:users!messages_user_id_fkey(*,icon:icons (*, theme:themes (*)))"
    )
    .eq("id", req.params.msgid);
  if (error) {
    res.status(500).send(error);
    return;
  }
  res.status(200).send(data);
});

router.get("/user/:userid", async (req, res) => {
  const db = supaBase();
  const { data, error } = await db
    .from("messages")
    .select(
      "*, tags:hashtag(tag), user:users!messages_user_id_fkey(*,icon:icons (*, theme:themes (*)))"
    )
    .eq("user_id", req.params.userid)
    .order("updated", { ascending: false });
  if (error) {
    res.status(500).send(error);
    return;
  }
  res.status(200).send(data);
});

router.post("/:userid", async (req, res) => {
  const db = supaBase();
  const tags = getHashTags(req.body.message || "");
  const { data, error } = await db
    .from("messages")
    .insert({
      ...req.body,
      created: "now()",
      updated: "now()",
      user_id: req.params.userid,
    })
    .select();
  upsertTags(data[0].id, tags);
  if (error) {
    res.status(500).send(error);
    return;
  }
  res.status(201).send(data);
  return;
});

router.put("/:msgid", async (req, res) => {
  const db = supaBase();
  const tags = getHashTags(req.body.message || "");
  const { data, error } = await db
    .from("messages")
    .update({ ...req.body, updated: "now()" })
    .eq("id", req.params.msgid)
    .select();
  removeTags(req.params.msgid);
  upsertTags(req.params.msgid, tags);
  if (error) {
    res.status(500).send(error);
    return;
  }
  res.status(200).send(data);
});

router.delete("/:msgid", async (req, res) => {
  const db = supaBase();
  const { data, error } = await db
    .from("messages")
    .delete()
    .eq("id", req.params.msgid);
  if (error) {
    res.status(500).send();
    return;
  }
  res.status(204).send(data);
});
