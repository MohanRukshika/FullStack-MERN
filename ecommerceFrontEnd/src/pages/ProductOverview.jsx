import { useEffect, useState } from "react"
import {  useParams } from "react-router-dom"
import api from '../utils/api'
import toast from 'react-hot-toast'
import LoadingAnimation from "../components/LoadingAnimation"
import { Link } from "react-router-dom"
import ImageSlideShow from "../components/imageSlideShow"
import { addToCart } from "../utils/cart"

export default function ProductOverview(){

    const parameter = useParams() // this hook is used to read parameter in url
    const [product , setProduct] = useState(null)
    const [status,setStatus] = useState("Loading") //success , loading , error
     
    useEffect(()=>{
        api.get("/products/"+parameter.productId).then(
            (response)=>{
                console.log("PRODUCT FROM API:", response.data)
                setProduct(response.data)
                setStatus("success")
            }
        ).catch(
            (error)=>{
                toast.error(error?.response?.data?.message);
                setStatus("error")
            }
        )
    },[parameter.productId])

    return(
        <>
            <div className="w-full min-h-screen flex justify-center mb-12 md:mb-0">
                {
                    status === "Loading" && <LoadingAnimation/>
                }

                {
                    status === "error" && (
                        <div className="min-h-screen flex items-center justify-center bg-primary] px-4">
                            <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-lg border border-secondary/10">
                                <h1 className="mb-3 text-2xl font-bold text-secondary">Failed to load Product</h1>
                                <p className="mb-6 text-gray-500">Unable to load the product. Please try again.</p>
                                <Link to="/" className="inline-block rounded-lg bg-accent px-6 py-3 font-semibold text-primary transition duration-200 hover:bg-secondary hover:shadow-md" >Back to Products</Link>
                            </div>
                        </div>
                    )
                }
                {
                    status === "success" && <div className="w-full min-h-screen flex flex-col lg:flex-row gap-6 lg:gap-10 px-4 md:px-8 lg:px-10 py-6 lg:py-10">
                    <div className="h-[450px] lg:h-[550px] lg:w-1/2 flex justify-center">
                        <ImageSlideShow images={product.image} />
                    </div>
                    <div className="w-full lg:w-1/2 flex flex-col pt-2 lg:pt-5 font-semibold text-secondary ">
                        <h1 className="text-2xl md:text-3xl text-center">{product.name}</h1>
                           <div className="flex flex-wrap justify-center items-center gap-x-2 gap-y-1 mt-1 text-base md:text-xl text-[#791b10]/90">
                            {product.altNames.map((alternativeName, index) => (
                                <span key={index}>
                                    {index > 0 && " | "}
                                    {alternativeName}
                                </span>
                            ))}
                            </div>
                            <h2 className="text-accent/50 mt-2 ml-2">{product.productId}</h2>
                            <h3 className="text-2xl text-accent mt-2 ml-2 font-bold">LKR {product.price.toFixed(2)}</h3>
                            <h3 className=" text-secondary/50 mt-2 ml-2 line-through ">LKR {product.labelPrice.toFixed(2)}</h3>
                            <p className="text-black ml-2 mt-5">{product.description}</p>
                            <div className="flex gap-4 pt-10">
                                <button className="flex-1 py-4 rounded-lg border-2 border-accent bg-accent  text-white hover:bg-[#022428] hover:text-primary transition-colors duration-200" onClick={()=>{
                                    addToCart(product,1)
                                }}>Add to Cart</button>
                            <Link to="/checkout" state={
                                {
                                    product:{productId:product.productId,
                                            name:product.name,
                                            image:product.image[0],
                                            labelPrice:product.labelPrice,
                                            price:product.price,
                                            stock:product.stock
                                    },
                                    quantity:1
                                }
                            } className="flex-1 py-4 rounded-lg bg-secondary text-primary hover:bg-[#360b06] hover:text-primary transition-colors duration-200 flex items-center justify-center" >Buy Now </Link>
                            </div>
                    </div>
                    
                </div>
                }
            </div>
        </>
    )
}