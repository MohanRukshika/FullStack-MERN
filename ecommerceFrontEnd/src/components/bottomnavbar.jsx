import { IoHome } from "react-icons/io5";
import { Link } from "react-router-dom";
import { FaCartArrowDown } from "react-icons/fa6";
import { BsBagHeartFill } from "react-icons/bs";

export default function BottomNavbar(){
    return(
        <>
            <div className="flex items-center justify-between lg:hidden fixed bottom-2 w-[90%] h-[60px] shadow-[inset_0_0px_10px_rgba(0,0,0,0.0)] shadow-secondary/20 rounded-2xl bg-[#fdf9d9] text-2xl p-5 text-secondary">
                
                <Link to="/"><IoHome /></Link>
                <Link to="/products"><BsBagHeartFill /></Link>
                <Link to="/cart"><FaCartArrowDown /></Link>
                
            </div>
        </>
    )
}