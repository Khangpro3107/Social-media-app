const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      profilePicture: req.body.profilePicture,
      coverPicture: req.body.coverPicture
    });
    const user = await newUser.save();
    res.status(200).json("Registered successfully. Please log in.");
  } catch (err) {
    res.status(500).json(err)
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).json("User not found")

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) return res.status(403).json("Wrong password!")

    var outputUser = user;
    delete outputUser.password;
    delete outputUser.email;
    res.status(200).json(outputUser);
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
