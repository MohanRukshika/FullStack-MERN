import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';
import {useGoogleLogin} from '@react-oauth/google'
import { FcGoogle } from "react-icons/fc";
import api from "../utils/api";

export default function LoginPage(){

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();
    const googleLogin = useGoogleLogin({
        onSuccess:(response)=>{
            console.log(response)
            api.post("/users/googlelogin",{
                token:response.access_token
            }).then((response)=>{
                localStorage.setItem("token",response.data.token)
                toast.success("Login successfull")
                if(response.data.isAdmin){
                    navigate("/admin")
                }else{
                    navigate("/")
                }
            }).catch((error)=>{
                console.log(error)
            })
        },
        onError:()=>{
            toast.error("Google login Failed")
        }

    })

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
            toast.error(error?.response?.data?.message)
        })
    }


    return(
        <div className="w-full h-screen flex justify-center items-center bg-[url('/background.jpg')] bg-center bg-cover ">
            <div className="w-0 lg:w-1/2 h-full">
            </div>
            <div className="w-[90%] lg:w-1/2 h-full flex justify-center items-center">
                <div className="w-[400px] h-[500px] bg-black/10 backdrop-blur-md border border-white/20 rounded-xl shadow-secondary shadow-xl  flex flex-col justify-center items-center " >
                    <h1 className="lg:text-4xl text-3xl font-bold mb-8 text-[#effcfe]">Sign In</h1>
                    
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
                    
                    <p className="w-3/4 p-3 mb-4 text-right text-gray-300">Forgot Password? <Link to="/forgotpassword" className="text-[#7ac5cf] hover:underline" >Click Here</Link> </p>
                    
                    <button onClick={handleLogin} className="w-3/4 p-3 mb-4 bg-secondary text-[#effcfe] rounded-lg shadow-inner shadow-black">Sign in</button>
                    <button
                        onClick={googleLogin}
                        className="w-3/4 p-3 bg-white text-gray-900 rounded-lg shadow-md flex items-center justify-center gap-2 hover:bg-gray-100"
                    >
                        <FcGoogle size={22} />
                        Sign in with Google
                    </button>
                    <p className="w-3/4 p-3 mb-4 text-center text-gray-300 ">Don't Have an Account? <Link to="/register" className="text-[#8cd7e0] hover:underline" >Register</Link> </p>
                </div>
            </div>
        </div>
    )
}