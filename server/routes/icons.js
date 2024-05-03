import Router from "express-promise-router";
import { supaBase } from "../db/supa_db.js";

const router = new Router();

export default router;

router.get("/", async (req, res) => {
  const db = supaBase();
  const { data, error } = await db
    .from("icons")
    .select("*, icon:themes!inner(*)");
  res.send(data);
  if (error) {
    res.status(500).send();
    return;
  }
  res.status(200).send(data);
});
