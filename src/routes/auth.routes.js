const express = require("express");
const passport = require("passport");
const router = express.Router();

const { signup, createInvestment, getinvestments, payment } = require ("../controller/controller");



// Auth login
// Auth login
router.get("/login", (req, res) => {
  res.render("login", { user: req.user });
});


router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/redirect",
  passport.authenticate("google"),
  (req, res) => {
    // res.send("you have reached the callback uri");
    // console.log("ll")
     res.render("profile", { user: req.user });

  }
);
router.post("/signup", signup);
router.post("/create", createInvestment);
router.get("/getAll", getinvestments);
router.post("/payment", payment);



module.exports = router;