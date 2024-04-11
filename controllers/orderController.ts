import { Request, Response } from "express";
import { ShopifyOrdersService } from "./../services/ordersService";

export class OrderController {
  private readonly orderService: ShopifyOrdersService;

  constructor(orderService: ShopifyOrdersService) {
    this.orderService = orderService;
  }

  async getAllOrders(req: Request, res: Response) {
    try {
      const orders = await this.orderService.getAllOrders();
      res.status(200).json(orders);
    } catch (error: any) {
      console.error("Error fetching all orders:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
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
        return res.status(404).json({ error: "Order not found" });
      }
      res.status(200).json(order);
    } catch (error: any) {
      console.error(`Error fetching order ${orderId}:`, error.message);
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  }

}
