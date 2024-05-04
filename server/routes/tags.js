import Router from "express-promise-router";
import { supaBase } from "../db/supa_db.js";

const router = new Router();

export default router;

router.get("/", async (req, res) => {
  const db = supaBase();
  const { data, error } = await db
    .from("hashtag")
    .select("*")
    .order("tag", { ascending: true })
    .limit(50);
  if (error) {
    res.status(500).send(error);
    return;
  }
  res.status(200).send(data);
});

router.get("/:tag", async (req, res) => {
  const db = supaBase();
  const { data, error } = await db
    .from("hashtag")
    .select(
      "messages!inner(* , tags:hashtag(tag), user:users!messages_user_id_fkey(*,icon:icons (*, theme:themes (*))))"
    )
    .eq("tag", `#${req.params.tag}`)
    .order("updated", { ascending: false, referencedTable: "messages" })
    .limit(25, { foreignTable: "messages" });
  if (error) {
    res.status(500).send(error);
    return;
  }
  res.status(200).send(data[0]?.messages);
});

//cant get this way to work
// router.get("/tags/:tagname", async (req, res) => {
//     const db = supaBase();
//     const { data, error } = await db
//       .from("messages")
//       .select(
//         "* , tags:hashtag(tag), user:users!messages_user_id_fkey(*,icon:icons (*, theme:themes (*)))"
//       ).contains("hashtag.tag","#test")
//       .order("updated", { ascending: false })
//       .limit(5);
//     if (error) {
//       res.status(500).send(error);
//       return;
//     }
//     res.status(200).send(data);
//   });
