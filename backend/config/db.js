import {Client} from "pg";

const db = new Client({
    user : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    host : process.env.DB_HOST,
    database : process.env.DB_DATABASE,
    port : process.env.DB_PORT
})

db.connect();