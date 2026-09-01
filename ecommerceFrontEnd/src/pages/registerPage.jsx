import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';

export default function RegisterPage(){

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("")
    const [confirmPassword,setConfirmPassword] = useState("")
    const navigate = useNavigate();

    function handleLogin(){

        if(!password==confirmPassword){
            toast.error("Password do not match")
            return
        }

        axios.post(import.meta.env.VITE_API_URL+"/users/",{
        email:email,
        password:password,
        firstName:firstName,
        lastName:lastName
        }).then((response)=>{
            toast.success('Registered Successfully')

            navigate("/login")

        }).catch((error)=>{
            console.log(error);
            toast.error(error.response.data.message)
        })
    }


    return(
        <div className="w-full h-screen flex justify-center items-center bg-[url('/background.jpg')] bg-center bg-cover ">
            <div className="w-0 lg:w-1/2 h-full">
            </div>
            <div className="w-[90%] lg:w-1/2 h-full flex justify-center items-center">
                <div className="w-[400px] h-[600px] bg-black/10 backdrop-blur-md border border-white/20 rounded-xl shadow-secondary shadow-xl  flex flex-col justify-center items-center " >
                    <h1 className="lg:text-4xl text-3xl font-bold mb-8 text-[#effcfe]">Register</h1>
                    
                    <input
                    onChange={
                        (e)=>{
                            setFirstName(e.target.value);
                        }
                    }   
                    placeholder="First Name" className="w-3/4 p-3 mb-6 rounded-lg border border-gray-400 focus:outline-none focus:ring-1 focus:ring-secondary placeholder-gray-400 text-gray-300"/>

                    <input
                    onChange={
                        (e)=>{
                            setLastName(e.target.value);
                        }
                    }   
                    placeholder="Last Name" className="w-3/4 p-3 mb-6 rounded-lg border border-gray-400 focus:outline-none focus:ring-1 focus:ring-secondary placeholder-gray-400 text-gray-300"/>


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
                    placeholder="Password" type="password" className="w-3/4 p-3 mb-6 rounded-lg border border-gray-400 focus:outline-none focus:ring-1 focus:ring-secondary placeholder-gray-400 text-gray-300"/>
                    
                    <input 
                    onChange={
                    (e)=>{
                            console.log("Password Changed");
                            setConfirmPassword(e.target.value);
                        }
                    }
                    placeholder="ConfirmPassword" type="password" className="w-3/4 p-3 mb-6 rounded-lg border border-gray-400 focus:outline-none focus:ring-1 focus:ring-secondary placeholder-gray-400 text-gray-300"/>

                    <button onClick={handleLogin} className="w-3/4 p-3  bg-secondary text-[#effcfe] rounded-lg shadow-inner shadow-black">Sign up</button>
                    
                    <p className="w-3/4 p-3 mb-4 text-right text-gray-300">Do You Have an Account? <Link to="/login" className="text-[#7ac5cf] hover:underline" >Login</Link> </p>
                </div>
            </div>
        </div>
    )
}