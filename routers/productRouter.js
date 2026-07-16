import express from 'express';
import { createProduct,deleteProduct,getAllProducts, getProductById, updateProduct } from "../Controllers/productController.js";
import { get } from 'mongoose';

const productRouter = express.Router();

productRouter.get("/",getAllProducts)
productRouter.post("/",createProduct)
productRouter.delete("/:productId",deleteProduct)
productRouter.put("/:productId",updateProduct)
productRouter.get("/:productId",getProductById)

export default productRouter