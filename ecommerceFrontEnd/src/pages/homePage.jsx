import Header from "../components/header"
import { Routes ,Route } from "react-router-dom"
import ProductPage from "./productsPage"
import ContactPage from "./contactPage"
import ProductOverview from "./ProductOverview"
import CartPage from './cartPage'
import CheckoutPage from "./checkout"
import CustomerOrdersPage from "./customerOrdersPage"
import SettingPage from "../components/settingPage"
import BottomNavbar from "../components/bottomnavbar"

export default function HomePage(){
    return(
        <>
       <div className=" w-full h-screen  flex flex-col">
            
            <Header/>
            
            <div className="w-full  bg-primary overflow-scroll">
                <Routes>
                    <Route path="/" element={<h1>WELCOME TO APPLIX</h1>}/>
                    <Route path="/products" element={<ProductPage/>} />
                    <Route path="/overview/:productId" element={<ProductOverview/>}/>
                    <Route path="/contact" element={<ContactPage/>}/>
                    <Route path="/cart" element={<CartPage/>}/>
                    <Route path="/checkout" element={<CheckoutPage/>}/>
                    <Route path="/myorders" element={<CustomerOrdersPage/>}/>
                    <Route path="/settings" element={<SettingPage/>} />
                </Routes>
                
            </div>
      </div>
      <BottomNavbar/> 
      </>
    )
}