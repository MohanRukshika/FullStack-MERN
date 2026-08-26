import {createClient } from '@supabase/supabase-js';
import { useState } from 'react';
import uploadMedia from '../utils/mediaUpload';

export default function TestCase(){

    const [file, setFile]= useState(null);

    async function handleUpload(){
        console.log(file);

        try{
            const url = await uploadMedia(file);
            console.log(url);
        }catch(error){
            console.log(error);
        }

    }

    return(
        <div className="flex flex-col justify-center items-center " >
        
            <input onChange={(e)=>{
                setFile(e.target.files[0])
            }} type="file"/>

            <button onClick={handleUpload} >Upload</button>
        </div>
    )
}

