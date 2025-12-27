import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import {findUserByEmail, findUserById} from "../models/user.model.js"
import { comparePassword } from "../utils/hash.js";

passport.use(
    new LocalStrategy({usernameField:"email",passwordField : "password", usernameField:"username"},
        async(email,password,username,done)=>{
            try{
                const user = await findUserByEmail(email);
                if(!user) return done(null,false,{message : "Invalid credentials"});

                const match = await comparePassword(password,user.password);
                if(!match){return done(null,false,{message : "Invalid credentials"})};
                
                return done(null,user);

            }
            catch(error){
                return done(error)
            }
        }
    
    )
)

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  try {
    const user = await findUserById(id);
    if (!user) {
      return done(null, false);
    }
    const safeUser = {
      id: user.id || user._id,
      email: user.email,
      
    };
    done(null, safeUser);
  } catch (err) {
    done(err);
  }
});
export default passport;