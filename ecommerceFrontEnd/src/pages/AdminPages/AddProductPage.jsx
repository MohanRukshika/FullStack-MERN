import React, { useState } from "react";
import toast from "react-hot-toast";
import uploadMedia from "../../utils/mediaUpload";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddProductPage(){

    const [productId ,setProductId] = useState("");
    const [name , setName] = useState("");
    const [altNames ,setAltNames] = useState("");
    const [price , setPrice] = useState(0);
    const [labelPrice ,setLabelPrice] = useState(0);
    const [description,setDescription] = useState("");
    const [image , setImage] = useState([]);
    const [brand , setBrand] = useState("");
    const [model , setModel] = useState("");
    const [category , setCategory] = useState("");
    const [isAvailable,setIsAvailable] = useState(true);
    const [stock ,setStock] = useState(0);
    
    const navigate = useNavigate()

    async function handleSave(){
        try{
            const token = localStorage.getItem("token");
            if(token==null){
                toast.error("You must be logged in to perform this action.");
                window.location.href="/login";
                return;
            }

            const mediaUrls = [];

            for(let i=0; i<image.length ;i++){
                mediaUrls.push(uploadMedia(image[i]));
            }
            // uploadMedia(image[0]);
            // uploadMedia(image[1]);

            const urls = await Promise.all(mediaUrls);
            const altNamesArray = altNames.split(",")

            const productData = {
            productId: productId,
            name: name,
            altNames: altNamesArray,
            price: price,
            labelPrice: labelPrice,
            description: description,
            image: urls,
            brand: brand,
            model: model,
            category: category,
            stock: stock,
            isAvailable: isAvailable
        };

        console.log("SENDING TO BACKEND:", productData);

            const response = await axios.post(import.meta.env.VITE_API_URL+"/products",productData,{
                headers:{
                    "Authorization":"Bearer "+token
                }
            });

            console.log("BACKEND RESPONSE:", response.data);

            toast.success("Product Added Successfully");
            navigate("/admin/products");

        }catch(error){

            console.log("========== CREATE PRODUCT ERROR ==========");
            console.log("Status:", error?.response?.status);
            console.log("Backend response:", error?.response?.data);
            console.log("Full error:", error);

            toast.error(
                error?.response?.data?.message || "Failed to create product"
            );
            
            
        }
    }

    async function handleCancel(){
        try{
            navigate("/admin/products")
        }catch{

        }
    }

    return(

        <div className="w-full h-full flex items-center flex-col p-4 overflow-y-scroll">
            
            <div className="sticky top-5 w-full h-[90px] bg-accent text-white flex items-center justify-between rounded-2xl px-7">
                <h1 className="text-xl font-medium"> Add New Product</h1>

                <div className="flex flex-row gap-3">
                    <button onClick={handleSave} type="button" className="h-[50px] px-5 bg-[#096e29] flex justify-center items-center rounded-2xl font-medium hover:bg-[#075c22] active:scale-95 transition-all duration-150 shadow-[inset_0_0_10px_rgba(0,0,0,0.3)]">Save</button>
                    <button onClick={handleCancel} type="button" className="h-[50px] px-5 bg-[#b3220f] flex justify-center items-center rounded-2xl font-medium hover:bg-[#941c0d] active:scale-95 transition-all duration-150 shadow-[inset_0_0_10px_rgba(0,0,0,0.3)]">Cancel</button>
                </div>
            </div>

            <div className=" w-full flex flex-wrap bg-white shadow-accent shadow-md p-5 mt-8 rounded-lg gap">
                <div className="w-1/4 bg-white p-2">
                    <label className="block mb-2 font-semibold">ProductID</label>
                    <input value={productId} onChange={
                        (e)=>{
                            setProductId(e.target.value)
                        }
                    }  className="w-full border rounded border-gray-500 p-2 focus:ring-1 focus:ring-gray-600 focus:outline-none"/>
                </div>
                <div className="w-3/4 bg-white p-2">
                    <label className="block mb-2 font-semibold">Name</label>
                    <input value={name} onChange={
                        (e)=>{
                            setName(e.target.value)
                        }
                    } className="w-full border rounded border-gray-500 p-2  focus:outline-none focus:ring-1 focus:ring-gray-600"/>
                </div>
                <div className="w-full bg-white p-2">
                    <label className="block mb-2 font-semibold">Alternative Names (comma ( , ) seperated)</label>
                    <input value={altNames} onChange={
                        (e)=>{
                            setAltNames(e.target.value)
                        }
                    } className="w-full border rounded border-gray-500 p-2 focus:ring-1 focus:ring-gray-600 focus:outline-none"/>
                </div>
                <div className="w-1/4 bg-white p-2">
                    <label className="block mb-2 font-semibold">Price</label>
                    <input value={price} onChange={
                        (e)=>{
                            setPrice(Number(e.target.value))
                        }
                    } className="w-full border rounded border-gray-500 p-2 focus:ring-1 focus:ring-gray-600 focus:outline-none"/>
                </div>
                <div className="w-1/4 bg-white p-2">
                    <label className="block mb-2 font-semibold">Label Price</label>
                    <input value={labelPrice} onChange={
                        (e)=>{
                            setLabelPrice(Number(e.target.value))
                        }
                    } className="w-full border rounded border-gray-500 p-2 focus:ring-1 focus:ring-gray-600 focus:outline-none"/>
                </div>

                <div className="w-1/4 bg-white p-2">
                    <label className="block mb-2 font-semibold">Image</label>
                    <input type="file" multiple onChange={
                        (e)=>{
                            setImage(Array.from(e.target.files))
                        }
                    } className="w-full border rounded border-gray-500 p-2 focus:ring-1 focus:ring-gray-600 focus:outline-none"/>
                </div>
                <div className="w-1/4 bg-white p-2">
                    <label className="block mb-2 font-semibold">Category</label>
                    <select  
                        value={category}
                        onChange={(e)=>{
                        setCategory(e.target.value);
                        
                    }} className="w-full border rounded border-gray-500 p-2 focus:ring-1 focus:ring-gray-600 focus:outline-none">
                        <option value="Living Room">Living Room</option>
                        <option value="Bedroom" >Bedroom</option>
                        <option value="Dining Room">Dining Room</option>
                        <option value="Kitchen" >Kitchen</option>
                        <option value="Office" >Office</option>
                        <option value="Home Decor" >Home Decor</option>
                        <option value="Others" >Others</option>
                    </select>
                </div>
                <div className="w-full bg-white p-2">
                    <label className="block mb-2 font-semibold">Description</label>
                    <textarea value={description} onChange={
                        (e)=>{
                            setDescription(e.target.value)
                        }
                    } className="w-full border rounded border-gray-500 p-2 focus:ring-1 focus:ring-gray-600 focus:outline-none"/>
                </div>

                <div className="w-1/4 bg-white p-2">
                    <label className="block mb-2 font-semibold">Availability</label>
                    <select value={isAvailable} onChange={
                        (e)=>{
                            setIsAvailable(e.target.value=="true")
                        }
                    } className="w-full border rounded border-gray-500 p-2 focus:ring-1 focus:ring-gray-600 focus:outline-none" >
                        <option value={true}>Available</option>
                        <option value={false}>Not Available</option>
                    </select>
                        
                    
                </div>
                <div className="w-1/4 bg-white p-2">
                    <label className="block mb-2 font-semibold">Brand</label>
                    <input value={brand} onChange={
                        (e)=>{
                            setBrand(e.target.value)
                        }
                    } className="w-full border rounded border-gray-500 p-2 focus:ring-1 focus:ring-gray-600 focus:outline-none"/>
                </div>
                <div className="w-1/4 bg-white p-2">
                    <label className="block mb-2 font-semibold">Model</label>
                    <input value={model} onChange={
                        (e)=>{
                            setModel(e.target.value)
                        }
                    } className="w-full border rounded border-gray-500 p-2 focus:ring-1 focus:ring-gray-600 focus:outline-none"/>
                </div>
                <div className="w-1/4 bg-white p-2">
                    <label className="block mb-2 font-semibold">Stock</label>
                    <input value={stock} onChange={
                        (e)=>{
                            setStock(Number(e.target.value))
                        }
                    } className="w-full border rounded border-gray-500 p-2 focus:ring-1 focus:ring-gray-600 focus:outline-none"/>
                </div>
            </div>
        </div>    
    )
}  