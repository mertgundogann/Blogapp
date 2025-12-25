import {Client} from "pg";

const db = new Client({
    user : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    host : process.env.DB_HOST,
    database : process.env.DB_DATABASE,
    port : process.env.DB_PORT
})

try{
    await db.connect();
    console.log("DB is connected.")
}
catch(error){
    console.error("Cant connect db.");
    console.error(error.message);
}
export default db;