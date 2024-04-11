import { ShopifyClient } from "./api";
import { Order } from "types/order.types";

export class ShopifyOrdersService {
  private readonly shopifyClient: ShopifyClient;

  constructor(shopifyClient: ShopifyClient) {
    this.shopifyClient = shopifyClient;
  }

  async getAllOrders(): Promise<Order[]> {
    try {
      const orders = await this.shopifyClient.get<any[]>('/orders.json');
      if (!Array.isArray(orders)) {
        throw new Error('Invalid response from Shopify API: expected an array of orders.');
      }
      return orders;
    } catch (error : any) {
      console.error('Error fetching all orders:', error.message);
      throw new Error('Failed to fetch orders from Shopify API.');
    }
  }

  async getOrderById(orderId: number): Promise<Order | null> {
    try {
      if (!orderId || isNaN(orderId) || orderId <= 0) {
        throw new Error('Invalid order ID.');
      }
      const order = await this.shopifyClient.get<Order>(`/orders/${orderId}.json`);
      if (!order) {
        throw new Error(`Order with ID ${orderId} not found.`);
      }
      return order;
    } catch (error : any) {
      console.error(`Error fetching order with ID ${orderId}:`, error.message);
      if (error.response && error.response.status === 404) {
        return null;
      }
      throw new Error('Failed to fetch order from Shopify API.');
    }
  }
}
