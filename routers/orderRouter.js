import express from 'express'
import createOrder from '../Controllers/orderController.js';
import authenticateUser from '../middleware/authentication.js';

const orderRouter = express.Router();
orderRouter.post("/",authenticateUser,createOrder)

export default orderRouter;