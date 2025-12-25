import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../../.env") });
import { Client } from "pg";


const db = new Client({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    port: Number(process.env.DB_PORT)
});

try {
    await db.connect();
    console.log("DB is connected.");
} catch (error) {
    console.error("Cant connect db.");
    console.error(error.message);
}

export default db;
