import logo from "../assets/logo.png"; 
import { Link } from "react-router-dom"; 
import { FaCartArrowDown } from "react-icons/fa6"; 
import UserData from "./userData"; 
 
export default function Header() { 
    return ( 
        <header className="w-full h-[70px] lg:h-[100px] sticky top-0 z-50 bg-accent flex flex-row justify-between items-center px-3 lg:px-5"> 
            
            {/* Logo */}
            <Link 
                to="/" 
                className="w-[70px] h-[70px] md:w-[100px] md:h-[100px] flex items-center justify-center overflow-hidden rounded-full"
            > 
                <img 
                    src={logo} 
                    alt="APPLIX Logo" 
                    className="w-[55px] h-[55px] md:w-[80px] md:h-[80px] rounded-full object-cover shrink-0" 
                /> 
            </Link> 

            {/* Navigation */}
            <div className="lg:flex items-center hidden  gap-10"> 
                <Link 
                    className="text-white font-semibold hover:text-[#E7E1B1] transition-colors" 
                    to="/"
                >
                    HOME
                </Link> 
                <Link 
                    className="text-white font-semibold hover:text-[#E7E1B1] transition-colors" 
                    to="/products"
                >
                    PRODUCTS
                </Link> 

                <Link 
                    className="text-white font-semibold hover:text-[#E7E1B1] transition-colors" 
                    to="/contact"
                >
                    CONTACT
                </Link> 
            </div> 

            {/* User + Cart */}
            <div className="flex items-center gap-5 mr-3"> 
                
                <Link 
                    to="/cart" 
                    className="lg:flex hidden items-center justify-center text-[#fdf9d9] text-[30px] transition-colors"
                > 
                    <FaCartArrowDown /> 
                </Link> 

                <UserData/>     
            </div>          
     
        </header> 
    ); 
}