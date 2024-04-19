import { customer } from "./../controllers/customerController";
import { Router } from "express";
const customerRouter = Router();

customerRouter.get('/list/:phoneNumber', customer.getCustomerAddressList)
customerRouter.put('/')

export default customerRouter;