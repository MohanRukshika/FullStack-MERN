import supabase from "./supabaseClient";
import TestCase from "../components/test";

export default function uploadMedia(file){
    
   if(!file){
        throw new Error("No File Selected");
   }

    return new Promise((resolve , reject)=>{

        if(file == null){
            reject("No File Selected");
        }
        const timeStamp = new Date().getTime();
        const fileName =timeStamp+"_"+file.name;

        supabase.storage.from("images").upload(fileName , file ,{
            upsert : false,
            cacheControl:"3600"
        }).then(()=>{
            
            const publicURL = supabase.storage.from("images").getPublicUrl(fileName).data.publicUrl;
            resolve(publicURL);

        }).catch((error)=>{
            reject(error)
        })

    })

}