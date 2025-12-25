import express from "express";
import passport from "../config/passport.js";
import { register, logout, me } from "../controller/auth.controller.js";

const router = express.Router();


router.post("/register", register);


router.post("/login", passport.authenticate("local"), (req, res) => {
  res.json({ message: "Login successful", user: req.user });
});


router.post("/logout", (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ message: "Logout failed" });
    res.json({ message: "Logged out" });
  });
});

router.get("/me", (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).json({ message: "Not logged in" });
  res.json({ user: req.user });
});


export default router;
