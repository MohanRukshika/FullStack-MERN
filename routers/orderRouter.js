import express from 'express'
import {createOrder,getOrder,updateStatusAndNotes} from '../Controllers/orderController.js';
import authenticateUser from '../middleware/authentication.js';

const orderRouter = express.Router();

orderRouter.post("/",authenticateUser,createOrder)
orderRouter.get("/:pageSize/:pageNumber",authenticateUser,getOrder)
orderRouter.put("/:orderID",authenticateUser,updateStatusAndNotes)

export default orderRouter;