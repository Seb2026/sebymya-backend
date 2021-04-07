require("dotenv").config();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const favicon = require("serve-favicon");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");
const cors = require("cors");

const app = express();

// require database configuration
require("./configs/db.config");

const app_name = require("./package.json").name;
const debug = require("debug")(
  `${app_name}:${path.basename(__filename).split(".")[0]}`
);

// Middleware Setup
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup
app.use(
  require("node-sass-middleware")({
    src: path.join(__dirname, "public"),
    dest: path.join(__dirname, "public"),
    sourceMap: true,
  })
);

// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "/public")));
// app.use(favicon(path.join(__dirname, "public", "images", "favicon.ico")));

// default value for title local
app.locals.title = "Express - Generated with IronGenerator";

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"],
  })
);

// app.use((req, res, next) => {
//   // If no routes match, send them the React HTML.
//   // console.log({ dirname: __dirname + "./public/index.html" });
//   res.sendFile(__dirname + "/index.html");
// });

// const index = require('./routes/index');
// app.use('/', index);
//      |  |  |
//      V  V  V
app.use("/", require("./routes/index.routes"));
app.use("/", require("./routes/photos.routes"));
app.use("/", require("./routes/file-upload.routes"));

app.use((req, res, next) => {
  // If no routes match, send them the React HTML.
  // console.log({ dirname: __dirname + "./public/index.html" });
  res.sendFile(__dirname + "/index.html");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening to port ${PORT}`));

module.exports = app;
