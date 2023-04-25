require("dotenv").config();
require("colors");
const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const path = require("path");
const pool = require("./database/db");
const userRoute = require("./routes/auth.routes");
const passport = require("passport");
const cors = require("cors");
const GoogleStrategy = require("./config/passport-setup");


const app = express();

// use TZ LAGOS to set the timezone to lagos
process.env.TZ = "Africa/Lagos"; // will set the timezone to lagos

app.use(cookieParser());
app.use(cors(
  {
    origin: "http://localhost:1234",
    credentials: true
  }
));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.set('views', path.join(__dirname, 'views'));


app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
  maxAge: 24 * 60 * 60 * 1000
}))


//Initialize passport
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.render("home", { user: req.user });
});


app.use("/auth", userRoute);
// app.use("/profile", profileRoutes);

app.get(
  "auth/google/redirect",
  passport.authenticate("google"),
  (req, res) => {
    res.send("you have reached the callback uri");
  }
);

const port = process.env.PORT || 1234;

app.listen(port, () => {
  console.log(`Server running on port ${port}`.yellow.underline);
});
