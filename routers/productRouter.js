import express from 'express';
import { createProduct, deleteProduct, getAllProducts, getProductById, searchProducts, updateProduct } from "../Controllers/productController.js";
import authenticateUser from '../middleware/authentication.js'

const productRouter = express.Router();

productRouter.get("/",getAllProducts)
productRouter.post("/",authenticateUser,createProduct)
productRouter.delete("/:productId",authenticateUser,deleteProduct)
productRouter.put("/:productId",authenticateUser,updateProduct)
productRouter.get("/:productId",authenticateUser,getProductById)
productRouter.get("/search/:query",searchProducts)

export default productRouter