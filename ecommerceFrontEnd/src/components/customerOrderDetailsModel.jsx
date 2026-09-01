import { FaRegEye, FaPhoneAlt } from "react-icons/fa";
import { IoClose, IoHome } from "react-icons/io5";
import { useState } from "react";
import api from '../utils/api'
import toast from 'react-hot-toast'

export default function CustomerOrderDetailsModel(props) {
  const order = props.order;
  const refresh = props.refresh;

  const [isModelOpen, setIsModelOpen] = useState(false);
  const [notes,setNotes] =useState(props.order.notes)
  const [status,setStatus] =useState(props.order.status)
  const [isUpdating,setIsUpdating] =useState(false)

async function updateOrder(){
  try{
    const token = localStorage.getItem("token")

    await api.put("/orders/"+order.orderID,{
      notes: notes,
      status:status
    },{
      headers:{
        Authorization:"Bearer "+token
      }
    })

    toast.success("Order updated successfully");
    refresh()
    setIsUpdating(false)
  }catch(error){
    console.log(error)
    toast.error("Failed to update order")
    setIsUpdating(false)
  }
}
  return (
    <>
      {/* Eye Button */}
      <button
        className="text-accent cursor-pointer ml-[15px] text-xl"
        onClick={() => setIsModelOpen(true)}
      >
        <FaRegEye />
      </button>

      {/* Modal */}
      {isModelOpen && (
        <div className="w-screen h-screen fixed bg-secondary/30 top-0 left-0 flex items-center justify-center z-[99]">

          {/* Modal */}
          <div className="w-[600px] h-[650px] bg-white rounded-md shadow-lg flex flex-col relative overflow-hidden">

            {/* Close Button */}
            <button
              onClick={() => setIsModelOpen(false)}
              className="absolute top-2 right-2 text-xl text-secondary hover:text-red-700 cursor-pointer z-10"
            >
              <IoClose />
            </button>

            {/* Header / Customer Details */}
            <div className="w-full px-5 pt-4 pb-3 border-b border-gray-200 shrink-0">

              {/* Top Row */}
              <div className="flex items-center gap-10 text-sm mb-3">

                {/* Order ID */}
                <p className="text-black bg-accent/10 p-0.5 rounded">
                  {order.orderID}
                </p>

                {/* Email */}
                <p className="text-black italic">
                  {order.email}
                </p>

                {/* Phone */}
                <div className="flex items-center gap-1 text-black">
                  <FaPhoneAlt className="text-xs text-black" />
                  <span>{order.phone}</span>
                </div>

                {/* Status */}
                <div className="flex items-center gap-1 text-blue-950 font-medium bg-primary p-1.5 rounded-full">
                  <span>{status}</span>
                </div>

              </div>

              {/* Customer Name + Address Same Line */}
              <div className="flex items-start gap-6 text-sm text-black">

                {/* Customer Name */}
                <div className="flex items-center whitespace-nowrap">
                  <strong className="mr-1">
                    Customer:
                  </strong>

                  <span>
                    {order.firstName} {order.lastName}
                  </span>
                </div>

                {/* Address */}
                <div className="flex items-start gap-2 min-w-0">

                  {/* Home Icon */}
                  <IoHome className="mt-0.5 shrink-0 text-black" />

                  {/* Address Details */}
                  <div className="flex flex-wrap items-center min-w-0">

                    {/* Address Line 1 */}
                    <span>
                      {order.addressLineOne}
                    </span>

                    {/* Address Line 2 */}
                    {order.addressLineTwo && (
                      <>
                        <span className="mx-1">,</span>
                        <span>
                          {order.addressLineTwo}
                        </span>
                      </>
                    )}

                    {/* City */}
                    {order.city && (
                      <>
                        <span className="mx-1">,</span>
                        <span>
                          {order.city}
                        </span>
                      </>
                    )}

                    {/* Postal Code */}
                    {order.postalCode && (
                      <>
                        <span className="mx-1">,</span>
                        <span>
                          {order.postalCode}
                        </span>
                      </>
                    )}

                  </div>
                </div>

              </div>

            </div>

            <div className="px-4 py-3 flex-1 overflow-y-auto min-h-0">

              {order.items.map((item, index) => {

                const quantity = item.quantity || 1;

                const price =
                  item.product.price ||
                  item.price ||
                  0;

                const total = price * quantity;

                return (
                  <div
                    key={index}
                    className="w-full min-h-[90px] bg-gray-100 rounded-md mb-2 px-3 py-2 flex items-center gap-3"
                  >

                    {/* Product Image */}
                    <div className="w-[65px] h-[65px] shrink-0 bg-white rounded flex items-center justify-center overflow-hidden">

                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-contain"
                      />

                    </div>

                    {/* Product Information */}
                    <div className="flex-1 min-w-0">

                      <p className="font-semibold text-sm truncate">
                        {item.product.name}
                      </p>

                      <p className="text-xs text-gray-500 mt-1">
                        Quantity: {quantity}
                      </p>

                      <p className="text-xs text-gray-500">
                        Price: LKR{" "}
                        {price.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </p>

                    </div>

                    {/* Item Total */}
                    <div className="text-right font-semibold text-sm whitespace-nowrap">

                      LKR{" "}
                      {total.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}

                    </div>

                  </div>
                );
              })}

            </div>

            {/* Bottom Section */}
            <div className="border-t border-gray-300 px-5 py-3 shrink-0">

              {/* Total */}
              <div className="flex justify-between mt-5 items-center bg-white">

                <span className="font-semibold">
                  Total:
                </span>

                <span className="font-semibold">

                  LKR{" "}
                  {order.items
                    .reduce((total, item) => {

                      const quantity =
                        item.quantity || 1;

                      const price =
                        item.product.price ||
                        item.price ||
                        0;

                      return total + price * quantity;

                    }, 0)
                    .toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}

                </span>

              </div>

            </div>

          </div>
        </div>
      )}
    </>
  );
}