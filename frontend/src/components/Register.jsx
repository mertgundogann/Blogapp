import { useState } from "react";
import { registerUser } from "../../authservice/authservice"
import { useNavigate } from "react-router-dom";
export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userName,setUserName] = useState("");

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const data = await registerUser(email,password,userName);
            alert("Kayıt başarıı."+ data.message)
            navigate('/dashboard');
        }
        catch(error){
            const errorMsg = error.response?.data?.message || "Kayıt sırasında bir hata oluştu";
            alert(errorMsg);
            console.error(error);
        }
         }

  return (
    <>
  

    

      <div>
        <div>
             
          <h2>
            Register
          </h2>
        </div>

        <div className="">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900 dark:text-gray-100">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  
                />
              </div>
            </div>

            <div>
              <div>
                <label htmlFor="password">
                  Password
                </label>
                
              </div>
              <div className="">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
              </div>
            </div>
                     <div>
              <div>
                <label htmlFor="username">
                  Username
                </label>
                
              </div>
              <div className="">
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={userName}
                  onChange={(e)=>setUserName(e.target.value)}
                  required
                  autoComplete="userName"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
              >
                Register
              </button>
            </div>
          </form>

         
        </div>
      </div>
    </>
  )
}
