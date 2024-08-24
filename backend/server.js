require("dotenv").config();

process.on("uncaughtException", (err) => {
  console.log(err.stack); // to work with stack for error handling
  console.log(err.name, `\t${err.message}`);
  console.log("UNHANDLED EXCEPTION !  Shutting down...");
  process.exit(1);
});

const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
const { logger, logEvents, errorHandler, corsOptions, connectDB } = require("./utils/serverImports.js");
const PORT = process.env.PORT || 3500;

connectDB();

if (process.env.NODE_ENV === "development") {
  console.log(process.env.NODE_ENV);
  console.log("CUSTOM LOGGER DISABLED INSTEAD MORGAN IS ACTIVE");

  //3rd party middleware logger
  app.use(morgan("dev"));
} else if (process.env.NODE_ENV === "production") {
  console.log(process.env.NODE_ENV);
  console.log("CUSTOM LOGGER DISABLED INSTEAD MORGAN IS ACTIVE");

  //3rd party middleware logger
  app.use(morgan("dev"));
}

app.use(logger);
app.use(cors(corsOptions));

//builtin middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false })); // for getting parameter from url encoded data

// (builtin middleware for json)
app.use(express.json()); // for getting parameter from json data

//middleware for cookies
app.use(cookieParser());

//using /public with the subdir at first will check the public so use the path continuing that in html file
app.use("/", express.static(path.join(__dirname, "/public")));

//routes
app.use("/", require("./routes/root"));
app.use("/auth", require("./routes/authRoutes"));
app.use("/users", require("./routes/userRoutes"));

app.use("/products", require("./routes/api/products.js"));
app.use("/createProduct", require("./routes/api/products.js"));

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 not found");
  }
});

app.use(errorHandler);
mongoose.connection.once("open", () => {
  console.log("connected to MongoDB");
  app.listen(PORT, () => console.log(`server running on port ${PORT}`));
});
mongoose.connection.on("error", (err) => {
  console.log(err);
  logEvents(`${err.no}: ${err.code} \t${err.syscall} \t${err.hostname}`, "mongoErrLog.log");
});
