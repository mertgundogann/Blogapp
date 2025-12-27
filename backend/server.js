import express from "express";
import session from "express-session";
import passport from "./config/passport.js";
import authRoutes from "./routes/auth.routes.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

// Body parser
app.use(express.json());

// Cors
app.use(cors({
  origin: "http://localhost:5173", // React frontend port
  credentials: true                
}));

// Session setup
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } 
  })
);

app.use(passport.initialize());
app.use(passport.session());


app.use("/api/auth", authRoutes);


app.listen(3000, () => {
  console.log("Server running on port 3000");
});
