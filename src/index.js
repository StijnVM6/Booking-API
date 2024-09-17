import express from "express";
import usersRouter from "./routes/users/users.js";
import amenitiesRouter from "./routes/amenities.js";
import hostsRouter from "./routes/hosts/hosts.js";
import propertiesRouter from "./routes/properties/properties.js";
import bookingsRouter from "./routes/bookings/bookings.js";
import customErrorHandler from "./middleware/customErrorHandler.js";

const app = express();

app.use(express.json());

app.use("/users", usersRouter);
app.use("/amenities", amenitiesRouter);
app.use("/hosts", hostsRouter);
app.use("/properties", propertiesRouter);
app.use("/bookings", bookingsRouter);

app.use(customErrorHandler);

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
