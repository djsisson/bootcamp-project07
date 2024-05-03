import now from "./now.js";
import base from "./default.js";
import seed_create from "../db/seed_create.js";
import seed_add from "../db/seed_add_data.js";
import themes from "./themes.js";
import icons from "./icons.js";
import users from "./users.js";
import messages from "./messages.js";
import tags from "./tags.js";

const mountRoutes = (app) => {
  app.use("/", base);
  app.use("/now", now);
  app.use("/themes", themes);
  app.use("/icons", icons);
  app.use("/users", users);
  app.use("/messages", messages);
  app.use("/tags", tags);
  app.use("/seed/add", seed_add);
  app.use("/seed/create", seed_create);
};

export default mountRoutes;
