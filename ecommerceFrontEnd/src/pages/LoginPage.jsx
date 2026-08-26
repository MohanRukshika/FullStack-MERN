import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';

export default function LoginPage(){

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();

    function handleLogin(){
        console.log("Email : "+email);
        console.log("Password : "+password);

        axios.post(import.meta.env.VITE_API_URL+"/users/login",{
        email:email,
        password:password
        }).then((response)=>{
            console.log("Login Successfull : ",response.data);
            
            localStorage.setItem("token", response.data.token);
    // Optional: save admin status
            localStorage.setItem("isAdmin", response.data.isAdmin);
            
            toast.success('Login Successful')

            if(response.data.isAdmin){
                //redirect to admin dashboard
                navigate("/admin")
            }else{
                //redirect to home page
                navigate("/")
            }

        }).catch((error)=>{
            console.log(error);
            toast.error(error.response.data.message)
        })
    }


    return(
        <div className="w-full h-screen flex justify-center items-center bg-[url('/background.jpg')] bg-center bg-cover ">
            <div className="w-1/2 h-full">
            </div>
            <div className="w-1/2 h-full flex justify-center items-center">
                <div className="w-[400px] h-[450px] bg-black/10 backdrop-blur-md border border-white/20 rounded-xl shadow-secondary shadow-xl  flex flex-col justify-center items-center " >
                    <h1 className="text-4xl font-bold mb-8 text-[#effcfe]">Sign In</h1>
                    
                    <input
                    onChange={
                        (e)=>{
                            console.log("Email Changed");
                            setEmail(e.target.value);
                        }
                    }   
                    placeholder="Email" className="w-3/4 p-3 mb-6 rounded-lg border border-gray-400 focus:outline-none focus:ring-1 focus:ring-secondary placeholder-gray-400 text-gray-300"/>
                    
                    <input 
                    onChange={
                    (e)=>{
                            console.log("Password Changed");
                            setPassword(e.target.value);
                        }
                    }
                    placeholder="Password" type="password" className="w-3/4 p-3 rounded-lg border border-gray-400 focus:outline-none focus:ring-1 focus:ring-secondary placeholder-gray-400 text-gray-300"/>
                    
                    <p className="w-3/4 p-3 mb-4 text-right text-gray-300">Forgot Password? <Link to="/forgotPassword" className="text-[#7ac5cf] hover:underline" >Click Here</Link> </p>
                    
                    <button onClick={handleLogin} className="w-3/4 p-3  bg-secondary text-[#effcfe] rounded-lg shadow-inner shadow-black">Sign in</button>
                    
                    <p className="w-3/4 p-3 mb-4 text-right text-gray-300">Don't Have an Account? <Link to="/forgotPassword" className="text-[#7ac5cf] hover:underline" >Register</Link> </p>
                </div>
            </div>
        </div>
    )
}