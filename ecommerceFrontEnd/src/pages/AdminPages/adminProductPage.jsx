import { Link } from "react-router-dom";
import { FiPlusCircle } from "react-icons/fi";
import {  useEffect, useState } from "react";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import toast from "react-hot-toast";
import LoadingAnimation from "../../components/LoadingAnimation";
import DeleteFunction from "../../components/deleteComponent";

export default function AdminProductPage(){

    const [products ,setProducts] = useState([]);
    const [isProductsAreLoaded , setIsProductsAreLoaded] = useState(false)

    useEffect(()=>{
      const token = localStorage.getItem("token")

      axios.get(import.meta.env.VITE_API_URL+"/products",{
        headers:{
          "Authorization":"Bearer "+token
        }
      }).then((response)=>{
        setProducts(response.data);
        setIsProductsAreLoaded(true);
      }).catch(
        (error)=>{
        console.log(error)
        }
      )
    },[isProductsAreLoaded])

    return(
      <div className="w-full h-full flex items-center flex-col p-4 overflow-y-scroll">
        <div className="sticky top-1 w-full h-[90px] bg-accent text-white flex items-center justify-between rounded-2xl px-7">
                <h1 className="text-xl font-medium"> Products</h1>
            </div>

        <div className="w-full h-full overflow-scroll p-5">

        {  isProductsAreLoaded ?
          <table className="w-full border-separate border-spacing-0 overflow-hidden rounded-xl bg-white  shadow-accent shadow-md ">

  <thead className="bg-secondary text-primary">
    <tr>
      <th className="px-5 py-4 text-left text-sm font-semibold rounded-tl-xl">
        Image
      </th>

      <th className="px-5 py-4 text-left text-sm font-semibold">
        ProductID
      </th>

      <th className="px-5 py-4 text-left text-sm font-semibold">
        Name
      </th>

      <th className="px-5 py-4 text-left text-sm font-semibold">
        Price
      </th>

      <th className="px-5 py-4 text-left text-sm font-semibold">
        Labeled Price
      </th>

      <th className="px-5 py-4 text-left text-sm font-semibold">
        Availability
      </th>

      <th className="px-5 py-4 text-left text-sm font-semibold">
        Stock
      </th>
      <th className="px-5 py-4 text-left text-sm font-semibold rounded-tr-xl">
        Action
      </th>
    </tr>
  </thead>

  <tbody>
    {products.map((item) => {
      return (
        <tr
          key={item.productId}
          className="bg-white hover:bg-accent/5 transition-colors duration-200"
        >
          <td className="px-5 py-3 border-b border-gray-200">
            <img
              className="w-[60px]  object-cover rounded-md border border-accent"
              src={item.image[0]}
              alt="product_image"
            />
          </td>

          <td className="px-5 py-3 text-sm text-secondary/70 border-b border-gray-200">
            {item.productId}
          </td>

          <td className="px-5 py-3 text-sm font-semibold text-secondary border-b border-gray-200">
            {item.name}
          </td>

          <td className="px-5 py-3 text-sm font-bold text-accent border-b border-gray-200">
            Rs. {item.price}
          </td>

          <td className="px-5 py-3 text-sm text-gray-500 line-through border-b border-gray-200">
            Rs. {item.labelPrice}
          </td>

          <td className="px-5 py-3 border-b border-gray-200">
            <span
              className={`inline-block px-4 py-1 rounded-full text-xs font-medium ${
                item.isAvailable
                  ? "bg-accent/10 text-accent"
                  : "bg-secondary/10 text-secondary"
              }`}
            >
              {item.isAvailable ? "Available" : "Not Available"}
            </span>
          </td>

          <td className="px-5 py-3 text-sm font-semibold text-secondary border-b border-gray-200">
            {item.stock}
          </td>
          <td className="px-5 py-3 text-sm font-semibold  border-b border-gray-200">
            <Link to="/admin/editProduct" state={item}><button className="text-[#096e29] cursor-pointer text-xl" ><FaEdit /></button></Link>
            
            <DeleteFunction 
            product={item} 
            refresh={()=>{
              setIsProductsAreLoaded(false)
            }}
            />
            
          </td>
          
        </tr>
      );
    })}
  </tbody>

          </table> : <LoadingAnimation />
        }           

            <Link to="/admin/addProduct" className="fixed bottom-2 right-2 text-5xl text-accent m-5 bg-primary hover:bg-accent rounded-full hover:text-primary ">
                <FiPlusCircle />
            </Link>
        </div>

    </div>
    )
}