import now from "./now.js";
import base from "./default.js";
import seed from "../db/seed.js";
import themes  from "./themes.js";
import icons from "./icons.js"

const mountRoutes = (app) => {
  app.use("/", base);
  app.use("/now", now);
  app.use("/themes", themes);
  app.use("/icons", icons);
  // app.use("/users", now);
  // app.use("/messages", now);
  // app.use("/tags", now);
  app.use("/seed", seed);
};

export default mountRoutes;
