
import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "../components/products";
import { IoSearchCircleSharp } from "react-icons/io5";
import api from '../utils/api'

export default function ProductPage() {
    const [products,setProducts] = useState([]);
    const [isProductAreLoaded,setIsProductsAreLoaded] =useState(false);
    const [query,setQuery] = useState("")

    useEffect(()=>{
        if(!isProductAreLoaded){
            console.log("API URL:", import.meta.env.VITE_API_URL)
            axios.get(import.meta.env.VITE_API_URL+"/products").then(
                (response)=>{
                    setProducts(response.data);
                    console.log(response.data)
                    setIsProductsAreLoaded(true);
                }
            ).catch((error)=>{
                console.log(error);
            })
        }
    },[isProductAreLoaded])

    async function handleSearch(){
        try{
            const response = await api.get("/products/search/"+query);
            setProducts(response.data)
        }catch(error){
            console.log(error)
        }
    }

    return (
    <>
        <div className="w-full flex flex-col">
            <div className="h-[70px] sticky top-0 z-40 bg-primary flex items-center justify-end gap-2 px-4 py-3">
                <input value={query} onChange={(e)=>{setQuery(e.target.value)}} type="text" className="border rounded-2xl w-[220px] sm:w-[300px] h-[50px] bg-white border-gray-300 border-2 focus:outline-none text-gray-600 p-3" placeholder="Search products..."/>
                <button onClick={handleSearch} className="shrink-0">
                    <IoSearchCircleSharp className="text-5xl text-accent"/>
                </button>
                <button onClick={()=>setIsProductsAreLoaded(false)} className="w-[110px] sm:w-[120px] bg-secondary p-2 rounded font-semibold text-primary shrink-0">
                    All Products
                </button>
            </div>
            <div className="w-full h-full flex justify-center items-center flex-wrap">
                {products.map((item)=>{
                    return(
                        <ProductCard product={item} key={item.productId}/>
                    )
                })}
            </div>
        </div>
    </>
  );
}
