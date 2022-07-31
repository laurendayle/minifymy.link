const path = require("path");
const express = require("express");
const compression = require("compression");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const router = require("./routes/index");
const User = require("./models/User").User;

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const port = process.env.PORT || 3005;
const app = express();
const connectDB = require("./database/index").connect;
connectDB();

const corsOptions = {
  origin: "http://127.0.0.1:5173/",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(compression());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);

app.use(express.static(path.join(__dirname, "dist")));
app.use("/api/v1/", router);

app.listen(port, () => {
  console.log(`Listening on ${port} in ${process.env.NODE_ENV} mode`);
});

module.exports = app;
