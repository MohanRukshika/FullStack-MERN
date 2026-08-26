import { model } from "mongoose"
import Product from "../models/product.js"

export async function createProduct(req,res) {
    
    if(!isAdmin(req)){
        res.status(403).json({
            message:"Access denied. Admins only"
        })
        return   
    }

    try{

        const existingProduct = await Product.findOne({
            productId:req.body.productId
        })

        if(existingProduct!=null){
            res.status(400).json({
                message:"Product with this productID already exists"
            })

            return
        }

        const newProduct = new Product({
            productId:req.body.productId,
            name:req.body.name,
            altNames:req.body.altNames,
            price:req.body.price,
            labelPrice:req.body.labelPrice,
            description:req.body.description,
            image:req.body.image,
            brand:req.body.brand,
            model:req.body.model,
            category:req.body.category,
            stock:req.body.stock,
            isAvailable:req.body.isAvailable
        })

        await newProduct.save()

        res.status(201).json({
            message:"Product created successfully"
        })
        

    }catch(error) {
    console.error("========== CREATE PRODUCT BACKEND ERROR ==========");
    console.error(error);
    console.error("Message:", error.message);
    console.error("Name:", error.name);
    console.error("Errors:", error.errors);

    res.status(500).json({
        message: "Error creating product",
        error: error.message
    });
}
}

export function isAdmin(req){
    if(req.user==null){
        return false
    }
    if(req.user.isAdmin){
        return true
    }else{
        return false
    }
}

export async function getAllProducts(req,res) {
    try{
            const pageSize = req.params.pageSize; //how many orders should be visible in one page
            const pageNumber = req.params.pageNumber

            const products = await Product.find({isAvailable:true});

            res.json(products);
        
    }catch(error){
        res.status(500).json({
            message:"Error finding products"
        })
    }
}

export async function deleteProduct(req,res){

    if(!isAdmin(req)){
        res.status(403).json({
            message:"Admin Only. Access Denied"
        })

        return
    }

    try{

        await Product.deleteOne({
            productId:req.params.productId
        })

        res.json({
            message:"Product deleted successfully"
        })

    }catch(error){
        res.json({
            message:"Product deletion failed"
        })
    }

}

export async function updateProduct(req,res){
    if(!isAdmin(req)){
        res.status(403).json({
            message:"Admin Only. Access Denied"
        })
        return
    }

    try{
        await Product.updateOne({
            productId:req.params.productId
        },{
           productId:req.body.productId,
            name:req.body.name,
            altNames:req.body.altNames,
            price:req.body.price,
            labelPrice:req.body.labelPrice,
            description:req.body.description,
            image:req.body.image,
            brand:req.body.brand,
            model:req.body.model,
            category:req.body.category,
            stock:req.body.stock,
            isAvailable:req.body.isAvailable 
        })

        res.status(200).json({
            message:"Product updated successfully"
        })
    }catch(error){
        res.status(200).json({
            message:"Product updation failed"
        })
    }
}

export async function getProductById(req,res){
    

    try{
        const product = await Product.findOne({
            productId:req.params.productId
        })

        if(product==null){
            res.status(404).json({
                message:"Product not found"
            })
        }else{
            if(isAdmin(req)){
                res.json(product)
            }else{
                if(product.isAvailable){
                    res.json(product)
                }else{
                    if(isAdmin(req)){
                        res.json(product)
                    }else{
                        res.status(403).json({
                        message:"Access denied, only admin can access"
                        })
                    }
                }
                
            }
        }
    }catch(error){
        res.status(500).json({
            message:"Error finding the product"
        })
    }
}