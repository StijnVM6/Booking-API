import express from "express";

import loginRouter from "./routes/login/login.js";
import usersRouter from "./routes/users/users.js";
import amenitiesRouter from "./routes/amenities/amenities.js";
import hostsRouter from "./routes/hosts/hosts.js";
import propertiesRouter from "./routes/properties/properties.js";
import bookingsRouter from "./routes/bookings/bookings.js";
import reviewsRouter from "./routes/reviews/reviews.js";

import "dotenv/config";
import logger from "./middleware/logger.js";
// import * as Sentry from "@sentry/node";
// import { nodeProfilingIntegration } from "@sentry/profiling-node";


import customErrorHandler from "./middleware/customErrorHandler.js";

const app = express();

/*
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
});
*/

app.use(express.json());

app.use(logger);

app.use("/login", loginRouter);
app.use("/users", usersRouter);
app.use("/amenities", amenitiesRouter);
app.use("/hosts", hostsRouter);
app.use("/properties", propertiesRouter);
app.use("/bookings", bookingsRouter);
app.use("/reviews", reviewsRouter);

// app.use(Sentry.Handlers.customErrorHandler());
// Sentry.setupExpressErrorHandler(app);
app.use(customErrorHandler);

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
