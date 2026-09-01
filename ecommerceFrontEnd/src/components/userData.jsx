import { useEffect, useState } from "react"
import api from '../utils/api'
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

export default function UserData(){

    const [user,setUser] = useState(null);
    const [isOpen,setIsOpen] = useState(false);

    useEffect(()=>{
        const token = localStorage.getItem("token")
        
        if(token){
            api.get("users/me",{
                headers:{
                    Authorization:"Bearer "+token
                }
            }).then((response)=>{
                setUser(response.data)
            }).catch(error=>
                console.log(error)
            )
        }

    },[])

    function logout(){
        localStorage.removeItem("token");
        setUser(null)
    }

    return(
        <div className="relative">
            {user ? (
                <>
                    <button
                        onClick={()=>setIsOpen(!isOpen)}
                        className="bg-secondary border-primary border-1 rounded-full w-8 h-8 md:w-12 md:h-12 flex items-center justify-center text-white font-bold"
                    >
                        {user.firstName?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase() || "U"}
                    </button>

                    {isOpen && (
                        <div className="absolute right-0 top-14 bg-white shadow-md rounded w-40 p-2">
                            <Link to="/profile" className="block p-2 hover:bg-gray-100">
                                My Profile
                            </Link>

                            <Link to="/settings" className="block p-2 hover:bg-gray-100">
                                Settings
                            </Link>

                            <Link to="/myorders" className="block p-2 hover:bg-gray-100">
                                My Orders
                            </Link>

                            <button onClick={logout} className="block w-full text-left p-2 hover:bg-gray-100 text-red-500">
                                Logout
                            </button>
                        </div>
                    )}
                </>
            ) : (
                <Link
                    to="/login"
                    className="bg-[#E7E1B1]  p-3 rounded-2xl text-black flex items-center gap-2 font-bold hover:bg-[#cac38d] shadow-inner shadow-secondary/10"
                >
                    Get Started <FaArrowRight />
                </Link>
            )}
        </div>
    )
}