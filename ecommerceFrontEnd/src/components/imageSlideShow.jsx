import { useState } from "react";

export default function ImageSlideShow(props){
    const [activeImage,setActiveImage]= useState(0)
    const images = props.images;
    
    return(
        <>
            <div className="w-[450px] h-[550px] flex flex-col m-5 border-2 border-secondary/30 ml-[200px] bg-white">
                <img className="w-full aspect-square object-cover"  src={images[activeImage]}/>
                <div className="h-[100px] w-full border-1 border-secondary/30 flex items-center justify-center gap-2">
                    {
                        images.map((item,index)=>{
                            return(
                                <img className={"w-[90px] h-[90px] border-2 cursor-pointer " +(index===activeImage ? " border-secondary/80" :" border-secondary/30")}  src={item} key={index} onClick={
                                    ()=>{
                                        setActiveImage(index)
                                    }
                                }/>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}