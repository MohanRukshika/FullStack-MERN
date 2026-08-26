import express from 'express';
import { createProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from "../Controllers/productController.js";
import authenticateUser from '../middleware/authentication.js'

const productRouter = express.Router();

productRouter.get("/",getAllProducts)
productRouter.post("/",authenticateUser,createProduct)
productRouter.delete("/:productId",authenticateUser,deleteProduct)
productRouter.put("/:productId",authenticateUser,updateProduct)
productRouter.get("/:productId",authenticateUser,getProductById)

export default productRouter