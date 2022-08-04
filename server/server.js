const path = require("path");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const corsOptions = require("./config/corsOptions");
const errorHandler = require("./middleware/errorHandler");
const { logger } = require("./middleware/logEvents");
const verifyJWT = require("./middleware/verifyJWT");
const credentials = require("./middleware/credentials");
require("dotenv").config();
const connectDB = require("./database/index").connect;
connectDB();

const port = process.env.PORT || 3005;
const app = express();

app.use(logger);
app.use(credentials);
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());


app.use("/", express.static("../client/dist"));

app.use("/", require("./routes/index"));
app.use("/register", require("./routes/Register"));
app.use("/auth", require("./routes/Auth"));
app.use("/refresh", require("./routes/Refresh"));
app.use("/logout", require("./routes/Logout"));
app.use("/shorten", require("./routes/Url"));
app.use("/dashboard", require("./routes/user"));

app.use(verifyJWT);
// app.use("/admin", require("./routes/api/admin"));

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ "error": "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Listening on ${port} in ${process.env.NODE_ENV} mode`);
});

