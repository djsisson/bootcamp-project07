import now from "./now.js";
import base from "./default.js";
import seed_create from "../db/seed_create.js";
import seed_add from "../db/seed_add_data.js";
import themes from "./themes.js";
import icons from "./icons.js";

const mountRoutes = (app) => {
  app.use("/", base);
  app.use("/now", now);
  app.use("/themes", themes);
  app.use("/icons", icons);
  // app.use("/users", now);
  // app.use("/messages", now);
  // app.use("/tags", now);
  app.use("/seed/add", seed_add);
  app.use("/seed/create", seed_create);
};

export default mountRoutes;
