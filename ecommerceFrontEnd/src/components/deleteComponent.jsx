import { RiDeleteBin6Fill } from "react-icons/ri";
import toast from "react-hot-toast";
import axios from "axios";
import { useState } from "react";

export default function DeleteFunction(props){
    const product = props.product
    const refresh = props.refresh

    const[isModelOpen , setIsModelOpen] = useState(false);

    function handleDelete(){
      const token = localStorage.getItem("token")
                axios.delete(import.meta.env.VITE_API_URL+"/products/"+product.productId,{
                  headers:{
                    "Authorization":"Bearer "+token
                  }
                }).then(
                  ()=>{
                    toast.success("Product Deleted Successfully")
                    refresh()
                  }
                ).catch((error)=>{
                  toast.error("Failed to delete the product");
                  console.log(error)
                })
    }

    return(

      <>
        <button  className="text-[#b3220f] cursor-pointer ml-[15px] text-xl "
        onClick={()=>{
          setIsModelOpen(true)
        }} ><RiDeleteBin6Fill /></button>

        {
          isModelOpen&& 
          <div className="w-screen h-screen fixed bg-secondary/30 top-0 left-0 flex items-center justify-center">
            <div className="w-[500px] min-h-[200px] bg-white border-secondary border-2 rounded-lg flex flex-col justify-center items-center p-6">
              <h1 className="text-[18px] font-bold mb-4 text-center">
                Are you sure you want to delete the product with ID{" "}
                <span className="text-[#b3220f]">{product.productId}</span>?
              </h1>

              <div className="flex gap-4">
              <button
              onClick={()=>{
                setIsModelOpen(false)
              }}
              className="px-5 py-2 rounded-md border border-gray-300 hover:bg-[#22ad4e] bg-[#12702f] text-white"
              >
              Cancel
            </button>

            <button
            onClick={()=>{
              setIsModelOpen(false)
              handleDelete()
            }}
            className="px-5 py-2 rounded-md bg-[#e81c01] text-white hover:bg-[#b3220f]"
          >
          Delete
        </button>
        </div>
            </div>
          </div>
        }
      </>
    )
}