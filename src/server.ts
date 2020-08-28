import errorHandler from "errorhandler";

import app from "./app";

/**
 * Error Handler. Provides full stack - remove for production
 */
app.use(errorHandler());

/**
 * Start Express server.
 */
const server = app.listen(8080, process.env.IP, () => {
  console.log(
      "  App is running at http://localhost:%d in %s mode",
      process.env.PORT,
      process.env.IP
  );
  console.log("Press CTRL-C to stop\n");
});

export default server;
