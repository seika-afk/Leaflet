const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();
const userModel = require("../models/user.model");

/////////# REGISTER
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedpwd = await bcrypt.hash(password, 10);

    const newUser = await userModel.createUser(username, email, hashedpwd);
    res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Registration Failed",
    });
  }
});
///////////# LOGIN
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await userModel.getUserByUsername(username);

    if (!user) {
      return res.status(400).json({
        message: "Username or password is incorrect",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Username or password is incorrect",
      });
    }

    const token = jwt.sign(
      {
        userId: user.id,
        username: user.username,
        email: user.email,
      },
      process.env.JWT_SECRET,
    );

    res.cookie("token", token, {
      httpOnly: true,
    });

    res.json({
      message: "Logged in successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Login failed",
    });
  }
});

module.exports = router;
