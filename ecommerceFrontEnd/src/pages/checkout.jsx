import { useState } from "react"
import { addToCart, getCart, getCartTotal } from "../utils/cart"
import { useLocation } from "react-router-dom"
import toast from "react-hot-toast";
import CreateOrderModel from "../components/createOrderModel";

export default function CheckoutPage(){
    const location = useLocation();
    const [cart, setCart] = useState(
    location.state ? [location.state] : getCart()
)
 //it displays the thing brought from the previous page

    return(
        <>
            <div className="w-full min-h-full flex flex-col p-5 pb-22 items-center gap-4 ">
                {
                    cart.map((item,index)=>{
                        return(
                            <div 
                                key={item.product.productId} 
                                className="bg-white w-full max-w-[500px] rounded-2xl shadow-md shadow-secondary flex flex-row items-center p-3 md:p-5 gap-3 md:gap-5"
                            >
                                <img 
                                    className="w-[80px] h-[80px] md:w-[100px] md:h-[100px] object-cover rounded-xl shrink-0" 
                                    src={item.product.image}
                                    alt={item.product.name}
                                />

                                <div className="flex-1 flex flex-col gap-1 relative ">
                                    <h1 className="text-lg font-bold text-black">
                                        {item.product.name}
                                    </h1>

                                    <p className="text-xs text-gray-500">
                                        Product ID: {item.product.productId}
                                    </p>

                                    <div className="flex items-center gap-2 mt-1">
                                        {
                                            item.product.labelPrice > item.product.price && (
                                                <span className="text-sm text-gray-400 line-through">
                                                    LKR {item.product.labelPrice}
                                                </span>
                                            )
                                        }

                                        <span className="text-lg font-bold text-secondary">
                                            LKR {item.product.price}
                                        </span>
                                    </div>

                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-3 ">
                                        <div className="flex items-center gap-2 ">
                                            <button className="w-8 h-8 rounded-lg bg-gray-200 hover:bg-gray-300 text-lg font-bold flex items-center justify-center" onClick={()=>{
                                                const newCart = [...cart]
                                                newCart[index].quantity-=1
                                                if(newCart[index].quantity<=0){
                                                    newCart.splice(index,1)
                                                }
                                                setCart(newCart)
                                            }}>
                                                −
                                            </button>

                                            <span className="text-base font-semibold min-w-[20px] text-center">
                                                {item.quantity}
                                            </span>

                                            <button className="w-8 h-8 rounded-lg bg-gray-200 hover:bg-gray-300 text-lg font-bold flex items-center justify-center" onClick={()=>{
                                                const newCart = [...cart]
                                                if (newCart[index].quantity < newCart[index].product.stock) {
                                                    newCart[index].quantity += 1
                                                    setCart(newCart)
                                                } else {
                                                    toast.error(`Only ${newCart[index].product.stock} items are in stock.`);
                                                }
                                            }}>
                                                +
                                            </button>
                                        </div>

                                        <span className="text-lg font-bold text-[#a12011]">
                                            LKR {item.product.price * item.quantity}
                                                </span>
                                        </div>
                                    
                                </div>
                                
                            </div>
                        )
                    })
                }
                <div  className="bg-[#E7E1B1] w-[350px] md:w-[500px] min-h-[60px] lg:min-h-[80px] rounded-2xl 
                 flex p-2 items-center justify-center gap-3 md:gap-20 fixed border-2 border-secondary lg:bottom-4 bottom-18">
                    <CreateOrderModel cart={cart} btnname="Order Now"/>
                    <p className="font-bold text-[20px] ">Total : LKR {getCartTotal(cart)}</p>
                </div>
            </div>
        </>
    )
}
