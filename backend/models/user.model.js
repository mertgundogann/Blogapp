import db from "../config/db.js"
export const findUserByEmail  = async (email) => {
    try{
        const result = await db.query("SELECT * FROM users WHERE email = $1",[email]);
    return result.rows[0];
    }
    catch(error){
       console.error("Cant find db",error)
       throw error;
    }
    
}

export const findUserById = async (id) => {
    try{
        const result = await db.query("SELECT * FROM users WHERE id = $1", [id]);
  return result.rows[0];
    }
     catch(error){
        
        console.error("Cant find db",error)
        throw error;
    }
};


export const createUser = async(email,password,username) => {
    try{
const result = await db.query("INSERT INTO users(email,password,username) VALUES($1,$2,$3) RETURNING id,email,username",[email,password,username]);
    return result.rows[0];
    }
      catch(error){
       
        console.error("Cant find db",error)
        throw error;
    }
}