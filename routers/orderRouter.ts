import { Router } from "express";
import {order} from "./../controllers/orderController";

const orderRouter = Router();

orderRouter.get('/list/:phoneNumber', order.getAllOrders)
orderRouter.get('/:orderId', order.getOrderById)
orderRouter

export default orderRouter;