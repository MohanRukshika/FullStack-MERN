import { useState } from "react"
import toast from "react-hot-toast"
import api from "../utils/api"

export default function CreateOrderModel(props) {
    const [isModelOpen, setIsModelOpen] = useState(false)
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [addressLineOne, setAddressLineOne] = useState("")
    const [addressLineTwo, setAddressLineTwo] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [postalCode, setPostalCode] = useState("")
    const [phone, setPhone] = useState("")

    async function createOrder(){
        try{

            const token = localStorage.getItem("token")
            const data={
                firstName,
                lastName,
                addressLineOne,
                addressLineTwo,
                city,
                state,
                postalCode,
                phone,
                items:[]
            }

            for(let i=0;i<cart.length;i++){
                const item = cart[i]
                data.items.push({
                    productId:item.product.productId,
                    quantity:item.quantity
                })
            }

            await api.post("/orders",data,{
                headers :{
                    Authorization : "Bearer "+token
                } 
            })
            toast.success("Order created successfully")

        }catch(error){
            console.log("Order creation failed");
    console.log("Status:", error.response?.status);
    console.log("Response:", error.response?.data);
    console.log("Full error:", error);
        }
    }

    const cart = props.cart
    const btnname = props.btnname
    return (
        <>
            <button
                className="bg-accent text-white px-4 py-2 rounded-lg font-semibold"
                onClick={() => setIsModelOpen(true)}
            >
                {btnname}
            </button>

            {isModelOpen && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
                    <div className="w-[400px] bg-white rounded-xl p-6 shadow-lg">

                        <h2 className="text-2xl font-bold mb-5">
                            Create Order
                        </h2>

                        <div className="space-y-3">
                            <input
                                type="text"
                                placeholder="First Name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="w-full border p-2 rounded-lg"
                            />

                            <input
                                type="text"
                                placeholder="Last Name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="w-full border p-2 rounded-lg"
                            />

                            <input
                                type="text"
                                placeholder="Address Line 1"
                                value={addressLineOne}
                                onChange={(e) => setAddressLineOne(e.target.value)}
                                className="w-full border p-2 rounded-lg"
                            />

                            <input
                                type="text"
                                placeholder="Address Line 2"
                                value={addressLineTwo}
                                onChange={(e) => setAddressLineTwo(e.target.value)}
                                className="w-full border p-2 rounded-lg"
                            />

                            <input
                                type="text"
                                placeholder="City"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                className="w-full border p-2 rounded-lg"
                            />

                            <input
                                type="text"
                                placeholder="State"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                                className="w-full border p-2 rounded-lg"
                            />

                            <input
                                type="text"
                                placeholder="Postal Code"
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}
                                className="w-full border p-2 rounded-lg"
                            />

                            <input
                                type="tel"
                                placeholder="Phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full border p-2 rounded-lg"
                            />
                        </div>

                        <div className="flex justify-end gap-3 mt-6">
                            <button type="button" onClick={() => setIsModelOpen(false)} className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100" > Cancel </button>
                            <button type="button"  onClick={() => {createOrder() }} className="bg-accent text-white px-4 py-2 rounded-lg font-semibold hover:opacity-90" > Place Order </button>
                        </div>

                    </div>
                </div>
            )}
        </>
    )
}
