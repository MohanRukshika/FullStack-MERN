import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "../components/products";

export default function ProductPage() {
    const [products,setProducts] = useState([]);
    const [isProductAreLoaded,setIsProductsAreLoaded] =useState(false);

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

    return (
    <>
        <div className="w-full h-full flex justify-center items-center flex-wrap">
            
            {products.map((item)=>{
                return(
                    
                    <ProductCard product={item} key={item.productId}/>
                )
            })}
            

        </div>
    </>
  );
}
