import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config();

export default function authenticateUser(req,res,next){
        const header = req.header("Authorization")
        
        if(header !=null){
            const token = header.replace("Bearer ","")

            jwt.verify(token,process.env.JWT_Secret_Key,  //myBackend - JWT Secret Key
                
                (error,decoded)=>{
                    if(decoded==null){
                        res.status(401).json({
                            "message":"Invalid token please login again"
                        })
                    }else{
                        req.user=decoded
                        next();
                    }

                }

            )

        }else{
            next()
        }
    }