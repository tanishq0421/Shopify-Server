import { ShopifyClient } from "./apiServices";
import { Order } from "types/order.types";
import { ResourceNotFoundError } from "./../errorhandler/resourceNotFound.errorhandler";
import { InvalidEntityError } from "./../errorhandler/invalidEntityErrorHandler";
import { ShopifyAPIError } from "./../errorhandler/shopifyAPI.errorhandler";

export class OrdersService {
  private readonly shopifyClient: ShopifyClient;

  constructor() {
    this.shopifyClient = new ShopifyClient(
      `${process.env.SHOPIFY_APP_NAME}`,
      `${process.env.SHOPIFY_APP_ACCESS_TOKEN}`
    );
  }

  async getAllOrders(): Promise<Order[] | null> {
    try {
      const response = await this.shopifyClient.get<{ orders: Order[] }>(
        "/orders.json?status=any"
      );
      const orders = response.orders;
      console.log(orders)
      if (!orders) {
        throw new ResourceNotFoundError("Orders");
      }
      if (!Array.isArray(orders)) {
        throw new InvalidEntityError(
          "Invalid response from Shopify API: expected an array of orders."
        );
      }
      return orders as Order[];
    } catch (error: any) {
      console.error("Error fetching all orders:", error.message);
      if (error.response && error.response.status === 404) {
        return null;
      }
      throw new ShopifyAPIError("Failed to fetch order from Shopify API.");
    }
  }

  async getOrderById(orderId: number): Promise<Order | null> {
    try {
      if (!orderId || isNaN(orderId) || orderId <= 0) {
        throw new InvalidEntityError("Invalid order ID.");
      }
      const order = await this.shopifyClient.get(
        `/orders/${orderId}.json`
      );
      if (!order) {
        throw new ResourceNotFoundError(`Order with ID ${orderId}`);
      }
      return order as Order;
    } catch (error: any) {
      console.error(`Error fetching order with ID ${orderId}:`, error.message);
      if (error.response && error.response.status === 404) {
        return null;
      }
      throw new ShopifyAPIError("Failed to fetch order from Shopify API.");
    }
  }

  async cancelOrder(orderId: number): Promise<void> {
    try {
      if (!orderId || isNaN(orderId) || orderId <= 0) {
        throw new InvalidEntityError("Invalid order ID.");
      }
      await this.shopifyClient.get<void>(`/orders/${orderId}.json`);
    } catch (error: any) {
      console.error(`Error canceling order with ID ${orderId}:`, error.message);
      throw new ShopifyAPIError("Failed to cancel order.");
    }
  }
}
