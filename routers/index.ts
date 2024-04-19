import { Router } from "express";
import customerRouter from "./customerRouter";
import orderRouter from "./orderRouter";

const ApiRouter = Router();

ApiRouter.use('/address', customerRouter)
ApiRouter.use('/orders', orderRouter)
export default ApiRouter;
