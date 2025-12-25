import{createPassword,comparePassword} from "../utils/hash.js";
import { findUserByEmail,createUser } from "../models/user.model.js";

export const register = async (req,res) => {
    const{username,email,password} = req.body;
    if(!username || !email || !password) return res.status(400).json({message : "Please enter username,email and password."});
    const user = await findUserByEmail(email);
    if(user) return res.status(409).json({message : "Email is already registered."});
    
    try{
    const hashedPassword = await createPassword(password);
    const newUser = await createUser(username,email,hashedPassword);

    res.status(201).json({
        message : "Registered succesfully",
        user : newUser
    })
    }
    catch(err){
        console.error(err);
    }

}
export const login = async (req,res) => {
    const email = req.body.email;
    const plainPassword = req.body.password;
    if(!email||!plainPassword) return res.status(400).json({message : "Email and password required"});
    try{
    const user = await findUserByEmail(email);
    if(!user) return res.status(401).json({message : "Invalid credentials"});
    const compare = await comparePassword(plainPassword,user.password);

    if(!compare){return res.status(401).json({message : "Invalid credentials"})};

    res.status(200).json({ message: "Login successful", user: { id: user.id, email: user.email } });
    }
    catch(error){
        console.error(error);
        res.status(500).json({message : "db error"});
    }
}

