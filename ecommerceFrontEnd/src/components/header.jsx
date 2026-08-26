import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { FaCartArrowDown } from "react-icons/fa6";

export default function Header() {
    return (
        <header className="w-full h-[100px] sticky top-0 bg-accent flex flex-row justify-between items-center">
            <Link to="/" className="w-[100px] h-[100px] ml-5 flex items-center justify-center overflow-hidden rounded-full">
                <img
                    src={logo}
                    alt="APPLIX Logo"
                    className="w-[80px] h-[80px] rounded-full object-cover"
                />
            </Link>
            <div >
                    <Link className="text-white font-semibold hover:text-[#ecca46]" to="/">HOME</Link>
                    <Link className="text-white ml-10 font-semibold hover:text-[#ecca46]" to="/products">PRODUCTS</Link>
                    <Link className="text-white  ml-10 font-semibold hover:text-[#ecca46]" to="/contact">CONTACT</Link>
                    
            </div>

            <div className="w-[100px] mr-5 flex items-center justify-center">
    <Link to="/cart" className="text-[#ecca46] text-[30px]">
        <FaCartArrowDown />
    </Link>
</div>

        </header>
    );
}
