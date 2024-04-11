import { Request, Response } from 'express';
import { ShopifyOrdersService } from '../services/ordersService';
import { EntityNotFoundError } from '../errorhandler/entityNotFound.errorhandler';
import { ResourceNotFoundError } from '../errorhandler/resourceNotFound.errorhandler';
import { ApplicationError } from '../errorhandler/application.errorhandler';
import { InvalidEntityError } from '../errorhandler/invalidEntityErrorHandler';

export class OrderController {
  private readonly orderService: ShopifyOrdersService;

  constructor(orderService: ShopifyOrdersService) {
    this.orderService = orderService;
  }

  async getAllOrders(req: Request, res: Response) {
    try {
      const orders = await this.orderService.getAllOrders();
      if (!orders || orders.length === 0) {
        throw new ResourceNotFoundError('No orders found');
      }
      res.status(200).json(orders);
    } catch (error: any) {
      console.error('Error fetching all orders:', error.message);
      if (error instanceof ResourceNotFoundError) {
        res.status(404).json({ error: error.message });
      } else if (error instanceof ApplicationError) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  }

  async getOrderById(req: Request, res: Response) {
    const orderId: number = parseInt(req.params.orderId);

    if (isNaN(orderId) || orderId <= 0) {
      return res.status(400).json({ error: 'Invalid Order ID' });
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
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  }

  async cancelOrder(req: Request, res: Response) {
    const orderId: number = parseInt(req.params.orderId);

    if (isNaN(orderId) || orderId <= 0) {
      return res.status(400).json({ error: 'Invalid Order ID' });
    }

    try {
      await this.orderService.cancelOrder(orderId);
      res.status(200).json({ message: `Order with ID ${orderId} has been successfully cancelled` });
    } catch (error: any) {
      console.error(`Error cancelling order ${orderId}:`, error.message);
      if (error instanceof EntityNotFoundError) {
        res.status(404).json({ error: error.message });
      } else if (error instanceof InvalidEntityError) {
        res.status(400).json({ error: error.message });
      } else if (error instanceof ApplicationError) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  }
}
