import { Client } from "pg";

const client = new Client({
  user: process.env.DB_USER,
  password: "m+9e+2rTt",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
});

console.log({
  DB_USER: process.env.DB_USER,
  USER: process.env.USER,
  USERNAME: process.env.USERNAME,
});

client
  .connect()
  .then(() => console.log("PostgreSQL connected"))
  .catch(err => console.error("DB connection error:", err));

export default client;
