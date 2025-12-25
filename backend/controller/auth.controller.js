import { createPassword } from "../utils/hash.js";
import { findUserByEmail, createUser } from "../models/user.model.js";


export const register = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password)
    return res.status(400).json({ message: "Please enter username, email and password." });

  try {
    const existingUser = await findUserByEmail(email);
    if (existingUser)
      return res.status(409).json({ message: "Email is already registered." });

    const hashedPassword = await createPassword(password);
    const newUser = await createUser(username, email, hashedPassword);

  
    req.login(newUser, (err) => {
      if (err) return next(err);
      res.status(201).json({
        message: "Registered and logged in successfully",
        user: newUser
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Registration failed" });
  }
};


import passport from "passport";

export const login = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ message: info.message || "Invalid credentials" });

    req.login(user, (err) => {
      if (err) return next(err);
      res.status(200).json({ message: "Login successful", user });
    });
  })(req, res, next);
};


export const logout = (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ message: "Logout failed" });
    res.json({ message: "Logged out" });
  });
};


export const me = (req, res) => {
  if (!req.user) return res.status(401).json({ message: "Not logged in" });
  res.json({ user: req.user });
};
