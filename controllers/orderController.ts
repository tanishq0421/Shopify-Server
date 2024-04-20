import { Request, Response } from "express";
import { OrdersService } from "../services/ordersService";
import { EntityNotFoundError } from "../errorhandler/entityNotFound.errorhandler";
import { ResourceNotFoundError } from "../errorhandler/resourceNotFound.errorhandler";
import { ApplicationError } from "../errorhandler/application.errorhandler";
import { InvalidEntityError } from "../errorhandler/invalidEntityErrorHandler";
import { Order } from "./../types/order.types";
export class OrderController {
  private readonly orderService: OrdersService;

  constructor() {
    this.orderService = new OrdersService();
    this.getAllOrders = this.getAllOrders.bind(this);
    this.getOrderById = this.getOrderById.bind(this);
    this.cancelOrder = this.cancelOrder.bind(this);
  }

  async getAllOrders(req: Request, res: Response) {
    try {
      const phoneNumber: string | undefined =
        req.params.phoneNumber?.toString();
      if (!phoneNumber) {
        return res.status(400).json({ error: "Phone number is required" });
      }

      const orders: Order[] | null = await this.orderService.getAllOrders();
      if (!orders || orders.length === 0) {
        throw new ResourceNotFoundError("No orders found");
      }

      const filteredOrders: Order[] = orders.filter(
        (order) => order.phone === phoneNumber
      );

      filteredOrders.length > 0 
        ? res.status(200).json(filteredOrders)
        : res.json("No orders found for the provided phone number");
    } catch (error: any) {
      console.error("Error fetching orders:", error.message);

      if (error instanceof ResourceNotFoundError) {
        res.status(404).json({ error: error.message });
      } else if (error instanceof ApplicationError) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  }

  async getOrderById(req: Request, res: Response) {
    const orderId: number = parseInt(req.params.orderId);

    if (isNaN(orderId) || orderId <= 0) {
      return res.status(400).json({ error: "Invalid Order ID" });
    }

    try {
      const order = await this.orderService.getOrderById(orderId);
      if (!order) {
        throw new EntityNotFoundError(`Order with ID ${orderId} not found`);
      }
      res.status(200).json(order);
    } catch (error: any) {
      console.error(`Error fetching order ${orderId}:`, error.message);
      if (error instanceof EntityNotFoundError) {
        res.status(404).json({ error: error.message });
      } else if (error instanceof InvalidEntityError) {
        res.status(400).json({ error: error.message });
      } else if (error instanceof ApplicationError) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  }

  async cancelOrder(req: Request, res: Response) {
    const orderId: number = parseInt(req.params.orderId);

    if (isNaN(orderId) || orderId <= 0) {
      return res.status(400).json({ error: "Invalid Order ID" });
    }

    try {
      await this.orderService.cancelOrder(orderId);
      res.status(200).json({
        message: `Order with ID ${orderId} has been successfully cancelled`,
      });
    } catch (error: any) {
      console.error(`Error cancelling order ${orderId}:`, error.message);
      if (error instanceof EntityNotFoundError) {
        res.status(404).json({ error: error.message });
      } else if (error instanceof InvalidEntityError) {
        res.status(400).json({ error: error.message });
      } else if (error instanceof ApplicationError) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  }
}

export const order = new OrderController();
