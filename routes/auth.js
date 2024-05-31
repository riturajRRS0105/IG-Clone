const express = require("express");
const User = require("../models/user");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../keys");
const requireLogin = require("../middleware/requireLogin");

router.post("/signup", (req, res) => {
  const { name, email, password, pic } = req.body;
  if (!name || !email || !password) {
    return res.status(422).json({ error: "Please fill all fields" });
  } else {
    User.findOne({ email: email }).then((savedUser) => {
      if (savedUser)
        return res.status(422).json({ error: "User already exists" });
      else {
        bcrypt.hash(password, 12).then((hashedPassword) => {
          const newuser = new User({
            name,
            email,
            password: hashedPassword,
            pic,
          });
          newuser
            .save()
            .then((user) => {
              return res.status(200).json({ msg: "User added successfully" });
            })
            .catch((err) => res.status(500).json({ error: err }));
        });
      }
    });
  }
});

router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(422).json({ error: "Please fill all the fields" });
  else {
    User.findOne({ email: email }).then((savedUser) => {
      if (!savedUser) {
        return res.status(422).json({ error: "Please signup" });
      } else {
        bcrypt.compare(password, savedUser.password).then((doMatch) => {
          if (doMatch) {
            const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET);
            const { _id, name, email, followers, following, pic } = savedUser;
            return res.json({
              token,
              user: { _id, name, email, followers, following, pic },
            });
          } else {
            return res.status(422).json({ error: "Wrong password" });
          }
        });
      }
    });
  }
});

router.get("/protected", requireLogin, (req, res) => {
  console.log("Protected access", req.user);
});
module.exports = router;
